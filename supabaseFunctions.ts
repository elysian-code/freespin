import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchUserData(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function fetchInvestments(userId: string) {
  const { data, error } = await supabase
    .from('investments')
    .select('*')
    .eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function addInvestment(userId: string, investmentDetails: any) {
  const { data, error } = await supabase
    .from('investments')
    .insert([{ user_id: userId, ...investmentDetails }]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateInvestment(investmentId: string, updates: any) {
  const { data, error } = await supabase
    .from('investments')
    .update(updates)
    .eq('id', investmentId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteInvestment(investmentId: string) {
  const { data, error } = await supabase
    .from('investments')
    .delete()
    .eq('id', investmentId);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}