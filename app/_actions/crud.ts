import { createClient } from "@/utils/supabase/server"

export type Investment = {
  id: string
  user_id: string
  amount: number
  created_at: string
  updated_at: string
}

export const getUserTransactions = async () => {
  const supabase = createClient()
  const { data: transactions, error } = await supabase
    .from('transactions')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (error) {
    console.error('Error fetching transactions:', error)
    return []
  }
  
  return transactions
}

export const updateAccountBalance = async (userId: string, balance: any) => {
  const supabase = createClient()
  const { error } = await supabase
    .from('account_balances')
    .update(balance)
    .eq('user_id', userId)
  
  if (error) {
    console.error('Error updating balance:', error)
    throw error
  }
  
  return true
}