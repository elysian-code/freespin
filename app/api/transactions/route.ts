import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type') // 'deposit' or 'withdrawal'
    
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    let query = supabase
      .from('transactions')
      .select('*')
      .eq('user_id', authData.user?.id)

    if (type) {
      query = query.eq('transaction_type', type)
    }

    const { data, error } = await query.order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()
    
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const transaction = {
      user_id: authData.user?.id,
      amount: body.amount,
      transaction_type: body.type,
      status: body.status || 'pending',
      ...body
    }

    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Update account balance if transaction is completed
    if (transaction.status === 'completed') {
      const balanceUpdate = transaction.transaction_type === 'deposit' 
        ? { increment: transaction.amount }
        : { decrement: transaction.amount }

      const { error: balanceError } = await supabase
        .from('account_balances')
        .update(balanceUpdate)
        .eq('user_id', authData.user?.id)

      if (balanceError) {
        return NextResponse.json({ error: balanceError.message }, { status: 400 })
      }
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}