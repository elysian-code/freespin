import { createClient } from '@/utils/supabase/server' 
import { User, AccountBalance, Investment, Transaction, Fund, Verification } from '../utils/database/types'


// Initialize Supabase client
const supabase = createClient()

// User Management
export async function getUserProfile(userId: string): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateUserProfile(userId: string, updates: Partial<User>): Promise<User | null> {
  const { data, error } = await supabase
    .from('users')
    .update(updates)
    .eq('id', userId)
    .single()

  if (error) throw error
  return data
}

// Account Balance
export async function getAccountBalance(userId: string): Promise<AccountBalance | null> {
  const { data, error } = await supabase
    .from('account_balances')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export async function updateAccountBalance(userId: string, updates: Partial<AccountBalance>): Promise<AccountBalance | null> {
  const { data, error } = await supabase
    .from('account_balances')
    .update(updates)
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

// Investments
export async function createInvestment(investment: Omit<Investment, 'id' | 'created_at' | 'updated_at'>): Promise<Investment | null> {
  const { data, error } = await supabase
    .from('investments')
    .insert(investment)
    .single()

  if (error) throw error
  return data
}

export async function getUserInvestments(userId: string): Promise<Investment[] | null> {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

// Transactions
export async function createTransaction(transaction: Omit<Transaction, 'id' | 'created_at'>): Promise<Transaction | null> {
  const { data, error } = await supabase
    .from('transactions')
    .insert(transaction)
    .single()

  if (error) throw error
  return data
}

export async function getUserTransactions(userId: string): Promise<Transaction[] | null> {
  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

// Funds
export async function createFund(fund: Omit<Fund, 'id' | 'created_at'>): Promise<Fund | null> {
  const { data, error } = await supabase
    .from('funds')
    .insert(fund)
    .single()

  if (error) throw error
  return data
}

export async function getUserFunds(userId: string): Promise<Fund[] | null> {
  const { data, error } = await supabase
    .from('funds')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error
  return data
}

// Verification
export async function submitVerification(verification: Omit<Verification, 'id' | 'created_at' | 'updated_at'>): Promise<Verification | null> {
  const { data, error } = await supabase
    .from('verifications')
    .insert(verification)
    .single()

  if (error) throw error
  return data
}

export async function getVerificationStatus(userId: string): Promise<Verification | null> {
  const { data, error } = await supabase
    .from('verifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error) throw error
  return data
}

// Notifications
export async function createNotification(userId: string, title: string, message: string): Promise<void> {
  const { error } = await supabase
    .from('notifications')
    .insert({ user_id: userId, title, message })

  if (error) throw error
}

export async function getUserNotifications(userId: string): Promise<Notification[] | null> {
  const { data, error } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

// Audit Logging
export async function logUserAction(userId: string, action: string): Promise<void> {
  const { error } = await supabase
    .from('audit_logs')
    .insert({ user_id: userId, action })

  if (error) throw error
}