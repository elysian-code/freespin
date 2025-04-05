'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { Inputs } from '@/app/signup/page' 
import { createClient } from '@/utils/supabase/server'
import { LInputs } from '@/app/login/page'
import { supabase } from '@/SupabaseClient'
import { User } from '@supabase/supabase-js'
import { AccountBalance, Investment } from '@/utils/database/types'
import { Packages } from '@/lib/deposits'


export async function login(formData: LInputs) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email.trim(),
    password: formData.password.trim(),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    return(error.message)
  }
  revalidatePath('/', 'layout')
  redirect('/home')
}

export async function signup(formData: Inputs) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.email.trim(),
    username: formData.username.trim(),
    phone_no: formData.phone_no.trim(),
    password: formData.password.trim(),
  }

  const { data: {user}, error } = await supabase.auth.signUp(data)
  

  if (error) {
    return error.message
  }

  console.log('user auth done')
  const {error: message} = await supabase.from('users').insert([{
    'id': user?.id,
    'email': formData.email,
    'name': formData.username,
    'password_hash': formData.password
  }])

  if (message)
    return console.error(message)
  
    
  console.log('user signed up')
   


  const { error: balanceError } = await supabase
        .from('account_balances')
        .insert([{ user_id: user?.id }]);

      if (balanceError) throw balanceError;


      console.log('user balance created')
  revalidatePath('/', 'layout')
  redirect('/login')
  
}


export async function getUser() {

  const supabase = createClient()

  try {
    
    const { data, error } = await supabase.auth.getUser()
    if(error){
      return error
    }
    const { data: users, error: message } = await supabase
  .from('users')
  .select('*')
  .eq('email', data.user?.email)
  .limit(1)
  if (message) return console.error(message)

  console.log(users)
  return users

    // const rUser = fetchUser(data.user as any)
    // rUser && console.log('current user data is: ',rUser)
      // return rUser

  } catch (error) {
    console.error(error)
  }

  return 

}

export async function signOut() {
  const supabase = createClient()
  const {error } = await supabase.auth.signOut()
  if (error) return error
  
}

const fetchUser = async (user: User) => {
  const supabase = createClient()
  // createUser(user)
  const { data, error } = await supabase
  .from('users')
  .select('*')
  .eq('email', user.email)
  .limit(1)
  if (error)
  return console.error(error)

  // console.log('current user data is: ',data)
  return data
}

// const createUser = async (formData: Inputs) => {
//   const supabase = createClient()
//  const {data, error} = await supabase.from('users').insert([{
    
//     'email': formData.email,
//     'name': formData.username,
//     'password_hash': formData.password
//   }]).select()

//   if (error)
//     return console.error(error)
  
//     console.log(data)
//     return data
// }


 export const getBalance = async () => {
  const supabase = createClient()

  try {
    
    const { data, error } = await supabase.auth.getUser()
    if(error){
      throw error
    }
    const { data: balance, error: message } = await supabase
      .from('account_balances')
      .select('*')
      .eq('user_id', data.user?.id)
      .single()

    if (message) return console.error(message)

    console.log(balance)
    return balance as AccountBalance

  } catch (error) {
    console.error(error)
    return null
  }
  
}
 export const getInvestment = async () => {
  const supabase = createClient()

  try {
    
    const { data, error } = await supabase.auth.getUser()
    if(error){
      throw error
    }
    const { data: balance, error: message } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', data.user?.id)
      .single()

    if (message) return console.error(message)

    
    
      
      
  const InvestmentPlan = Packages
  .filter(packs => balance.some((investment: Investment) => packs.packgeName === investment?.investment_type)).map(packs => {
    const investment = balance.find((investment: Investment) => packs.packgeName === investment?.investment_type); // Find matching item from array2
    return { ...packs,
       status: investment.status,
        create_at: investment.create_at,
        
      }; // Merge and add the 'status' property
  })
    console.log(InvestmentPlan)
    return InvestmentPlan

  } catch (error) {
    console.error(error)
    return null
  }
  
}


export const getWithdrawals = async () => {
  
  try {
    const { data, error: userError } = await supabase.auth.getUser()
    if(userError){
      throw userError
    }
    // Get the last successful withdrawal
    const { data: lastWithdrawalData, error: lastWithdrawalError } = await supabase
      .from('transactions')
      .select('amount')
      .eq('transaction_type', 'withdrawal')
      .eq('status', 'completed')
      .eq('user_id', data.user.id)
      .order('created_at', { ascending: false })
      .limit(1);

    if (lastWithdrawalError) throw lastWithdrawalError;

    const lastWithdrawal: number = lastWithdrawalData[0]?.amount || 0;

    // Get the total amount of successful withdrawals
    const { data: totalWithdrawalData, error: totalWithdrawalError } = await supabase
      .from('transactions')
      .select('amount')
      .eq('transaction_type', 'withdrawal')
      .eq('status', 'completed')
      .eq('user_id', data.user.id);

    if (totalWithdrawalError) throw totalWithdrawalError;

    const totalWithdrawal = totalWithdrawalData.reduce((sum, transaction) => sum + transaction.amount, 0);

    // Get the count of pending withdrawals
    const { data: pendingWithdrawalData, error: pendingWithdrawalError } = await supabase
      .from('transactions')
      .select('id')
      .eq('transaction_type', 'withdrawal')
      .eq('status', 'pending')
      .eq('user_id', data.user.id);

    if (pendingWithdrawalError) throw pendingWithdrawalError;

    const pendingWithdrawals = pendingWithdrawalData.length;

    return {
      lastWithdrawal,
      totalWithdrawal,
      pendingWithdrawals,
    };
  } catch (error) {
    console.error('Error fetching withdrawal data:', error);
    
  }
};

// Usage Example
// getWithdrawals('<USER_ID>')
//   .then((data) => {
//     console.log('Withdrawal Data:', data);
//   })
//   .catch((error) => {
//     console.error('Error:', error);
//   });
