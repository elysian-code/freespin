'use server'

import { revalidatePath } from 'next/cache'
import { Inputs } from '@/app/signup/page'
import { createClient } from '@/utils/supabase/server'
import { AccountBalance, Investment } from '@/utils/database/types'
import { Packages } from '@/lib/deposits'
import { redirect } from 'next/navigation'

export async function login(formData: any) {
  const supabase = createClient()

  const data = {
    email: formData.email.trim(),
    password: formData.password.trim(),
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.error('Login error:', error.message)
    throw new Error(error.message)
  }

  revalidatePath('/')
  redirect('/home')
}

export async function signup(formData: Inputs) {
  const supabase = createClient()

  let res = {
    error: null,
    data: null,
  } as any

  const data = {
    email: formData.email.trim(),
    username: formData.username.trim(),
    phone_no: formData.phone_no.trim(),
    password: formData.password.trim(),
    options: {
      emailRedirectTo: 'https://localhost:3000/auth/confirm'
    }
  }

  const { data: user, error } = await supabase.auth.signUp(data)

  if (error) {
    console.error('Signup error:', error.message)
    return res.error = error.message
  }

  console.log('User authentication successful')

  const { error: userInsertError } = await supabase.from('user_profiles').insert([
    {
      id: user?.user?.id,
      phone_number: formData.phone_no,
      email: formData.email,
      full_name: formData.username,
    },
  ])

  console.log('User signed up successfully')

   await supabase
    .from('wallets')
    .insert([{ user_id: user?.user?.id, balance: 0 }])


  
  revalidatePath('/')
  return { ...res, data: user?.user, success: true }
}

export async function getUser() {
  const supabase = createClient()

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      console.error('Error fetching authenticated user:', authError.message)
      throw new Error('Error fetching authenticated user')
    }

    const { data: users, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', authData.user?.email)
      .limit(1)

    if (userError) {
      console.error('Error fetching user data:', userError.message)
      throw new Error(userError.message)
    }

    console.log('Fetched user data:', users)
    return users
  } catch (error) {
    console.error('Unexpected error fetching user:', error)
    throw new Error('Failed to fetch user data')
  }
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error('Error signing out:', error.message)
    throw error
  }

  console.log('User signed out successfully')
}

export const getBalance = async () => {
  const supabase = createClient()

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      throw new Error('Error fetching authenticated user')
    }

    const { data: balance, error: balanceError } = await supabase
      .from('account_balances')
      .select('*')
      .eq('user_id', authData.user?.id)
      .single()

    if (balanceError) {
      console.error('Error fetching balance:', balanceError.message)
      throw new Error('Error fetching balance')
    }

    console.log('Fetched balance:', balance)
    return balance as AccountBalance
  } catch (error) {
    console.error('Unexpected error fetching balance:', error)
    throw new Error('Failed to fetch balance')
  }
}

export const getInvestment = async () => {
  const supabase = createClient()

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      throw new Error('Error fetching authenticated user')
    }

    const { data: investments, error: investmentError } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', authData.user?.id)

    if (investmentError) {
      console.error('Error fetching investments:', investmentError.message)
      throw new Error('Error fetching investments')
    }

    const investmentPlan = Packages.filter((pack) =>
      investments.some(
        (investment: Investment) => pack.packgeName === investment?.investment_type
      )
    ).map((pack) => {
      const investment = investments.find(
        (investment: Investment) => pack.packgeName === investment?.investment_type
      )
      return {
        ...pack,
        status: investment?.status,
        create_at: investment?.create_at,
      }
    })

    console.log('Fetched investment plan:', investmentPlan)
    return investmentPlan
  } catch (error) {
    console.error('Unexpected error fetching investments:', error)
    throw new Error('Failed to fetch investments')
  }
}

export const getWithdrawals = async () => {
  const supabase = createClient()

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      throw new Error('Error fetching authenticated user')
    }

    const { data: lastWithdrawalData, error: lastWithdrawalError } = await supabase
      .from('transactions')
      .select('amount')
      .eq('transaction_type', 'withdrawal')
      .eq('status', 'completed')
      .eq('user_id', authData.user?.id)
      .order('created_at', { ascending: false })
      .limit(1)

    if (lastWithdrawalError) throw new Error('Error fetching last withdrawal data')

    const lastWithdrawal: number = lastWithdrawalData[0]?.amount || 0

    const { data: totalWithdrawalData, error: totalWithdrawalError } = await supabase
      .from('transactions')
      .select('amount')
      .eq('transaction_type', 'withdrawal')
      .eq('status', 'completed')
      .eq('user_id', authData.user?.id)

    if (totalWithdrawalError) throw new Error('Error fetching total withdrawal data')

    const totalWithdrawal = totalWithdrawalData.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    )

    const { data: pendingWithdrawalData, error: pendingWithdrawalError } = await supabase
      .from('transactions')
      .select('id')
      .eq('transaction_type', 'withdrawal')
      .eq('status', 'pending')
      .eq('user_id', authData.user?.id)

    if (pendingWithdrawalError) throw new Error('Error fetching pending withdrawal data')

    const pendingWithdrawals = pendingWithdrawalData.length

    return {
      lastWithdrawal,
      totalWithdrawal,
      pendingWithdrawals,
    }
  } catch (error) {
    console.error('Error fetching withdrawal data:', error)
    throw new Error('Failed to fetch withdrawal data')
  }
}