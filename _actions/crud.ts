'use server'

import { revalidatePath } from 'next/cache'
import { Inputs } from '@/app/signup/page'
import { createClient } from '@/utils/supabase/server'
import { AccountBalance, Investment } from '@/utils/database/types'
import { Packages } from '@/lib/deposits'
import { redirect } from 'next/navigation'
import { getBaseUrl } from '@/utils/url'

export async function login(formData: { email: string; password: string }) {
  const supabase = createClient()

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: formData.email.trim(),
      password: formData.password.trim(),
    })

    if (error) {
      return { 
        error: error.message,
        success: false 
      }
    }

    revalidatePath('/')
    return { 
      data: data.user,
      success: true 
    }
  } catch (error) {
    console.error('Unexpected login error:', error)
    return {
      error: 'An unexpected error occurred during login',
      success: false
    }
  }
}

export async function signup(formData: Inputs) {
  const supabase = createClient()
  const baseUrl = getBaseUrl()

  try {
    // Check if user already exists
    const { data: existingUser } = await supabase
      .from('user_profiles')
      .select('email')
      .eq('email', formData.email.trim())
      .single()

    if (existingUser) {
      return {
        error: 'An account with this email already exists',
        success: false
      }
    }

    // Sign up the user
    const { data, error } = await supabase.auth.signUp({
      email: formData.email.trim(),
      password: formData.password.trim(),
      options: {
        data: {
          full_name: formData.username.trim(),
          phone_number: formData.phone_no.trim(),
        },
        emailRedirectTo: `${baseUrl}/auth/confirm`
      }
    })

    if (error) {
      console.error('Signup error:', error.message)
      return {
        error: error.message,
        success: false
      }
    }

    if (!data?.user?.id) {
      return {
        error: 'Failed to create user',
        success: false
      }
    }

    // Create user profile
    const { error: profileError } = await supabase
      .from('user_profiles')
      .insert([
        {
          id: data.user.id,
          email: formData.email.trim(),
          full_name: formData.username.trim(),
          phone_number: formData.phone_no.trim(),
        }
      ])

    if (profileError) {
      console.error('Profile creation error:', profileError.message)
      // Delete the auth user if profile creation fails
      await supabase.auth.admin.deleteUser(data.user.id)
      return {
        error: 'Failed to create user profile',
        success: false
      }
    }

    // Initialize user wallet
    const { error: walletError } = await supabase
      .from('wallets')
      .insert([
        {
          user_id: data.user.id,
          balance: 0,
          currency: 'USD'
        }
      ])

    if (walletError) {
      console.error('Wallet creation error:', walletError.message)
      // Don't delete the user in this case, as the wallet can be created later
    }

    return {
      data: data.user,
      success: true,
      message: 'Please check your email to verify your account.'
    }
  } catch (error) {
    console.error('Unexpected error during signup:', error)
    return {
      error: 'An unexpected error occurred',
      success: false
    }
  }
}

export async function getUser() {
  try {
    const response = await fetch('/api/user/profile')
    const { data, error } = await response.json()
    
    if (error) {
      console.error('Error fetching user data:', error)
      throw new Error(error)
    }

    return [data] // Returning in array to maintain backward compatibility
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

export const getBalance = async (): Promise<AccountBalance | null> => {
  const supabase = createClient()

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) throw new Error('Error fetching authenticated user')

    const { data: balance, error: balanceError } = await supabase
      .from('wallets')
      .select('*')
      .eq('user_id', authData.user?.id)
      .single()

    if (balanceError) throw balanceError
    return balance
  } catch (error) {
    console.error('Error fetching balance:', error)
    throw new Error('Failed to fetch balance')
  }
}

export const getInvestments = async (): Promise<Investment[]> => {
  const supabase = createClient()

  try {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) throw new Error('Error fetching authenticated user')

    const { data: investments, error: investmentError } = await supabase
      .from('user_investments')
      .select('*')
      .eq('user_id', authData.user?.id)

    if (investmentError) throw investmentError
    return investments || []
  } catch (error) {
    console.error('Error fetching investments:', error)
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
      .from('wallet_transactions')
      .select('amount')
      .eq('type', 'withdrawal')
      .eq('status', 'completed')
      .eq('user_id', authData.user?.id)
      .order('created_at', { ascending: false })
      .limit(1)

    if (lastWithdrawalError) throw new Error('Error fetching last withdrawal data')

    const lastWithdrawal: number = lastWithdrawalData[0]?.amount || 0

    const { data: totalWithdrawalData, error: totalWithdrawalError } = await supabase
      .from('wallet_transactions')
      .select('amount')
      .eq('type', 'withdrawal')
      .eq('status', 'completed')
      .eq('user_id', authData.user?.id)

    if (totalWithdrawalError) throw new Error('Error fetching total withdrawal data')

    const totalWithdrawal = totalWithdrawalData.reduce(
      (sum, transaction) => sum + transaction.amount,
      0
    )

    const { data: pendingWithdrawalData, error: pendingWithdrawalError } = await supabase
      .from('wallet_transactions')
      .select('id')
      .eq('type', 'withdrawal')
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

export async function sendMagicLink(email: string) {
  const supabase = createClient()
  const baseUrl = getBaseUrl()
  
  try {
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${baseUrl}/auth/confirm`,
        shouldCreateUser: true,
      },
    })

    if (error) {
      return { 
        error: error.message,
        success: false 
      }
    }

    return {
      success: true,
      message: 'Magic link has been sent to your email'
    }
  } catch (error) {
    console.error('Magic link error:', error)
    return {
      error: 'Failed to send magic link',
      success: false
    }
  }
}

export const updateAccountBalance = async (userId: string, updates: Partial<AccountBalance>) => {
  const supabase = createClient()
  try {
    const { data, error } = await supabase
      .from('wallets')
      .update(updates)
      .eq('user_id', userId)
      .select()
      .single()
    
    if (error) throw error
    return data
  } catch (error) {
    console.error('Error updating balance:', error)
    throw new Error('Failed to update balance')
  }
}

export const getUserTransactions = async () => {
  const supabase = createClient()
  
  try {
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) throw new Error('Error fetching authenticated user')

    const { data: transactions, error } = await supabase
      .from('wallet_transactions')
      .select('*')
      .eq('user_id', authData.user?.id)
      .order('created_at', { ascending: false })
  
    if (error) throw error
    return transactions || []
  } catch (error) {
    console.error('Error fetching transactions:', error)
    throw new Error('Failed to fetch transactions')
  }
}