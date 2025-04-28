import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'
import { Packages } from '@/lib/deposits'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data: investments, error: investmentError } = await supabase
      .from('investments')
      .select('*')
      .eq('user_id', authData.user?.id)

    if (investmentError) {
      return NextResponse.json({ error: investmentError.message }, { status: 400 })
    }

    // Combine investment data with package information
    const investmentPlan = Packages.filter((pack) =>
      investments.some(
        (investment) => pack.packgeName === investment?.investment_type
      )
    ).map((pack) => {
      const investment = investments.find(
        (investment) => pack.packgeName === investment?.investment_type
      )
      return {
        ...pack,
        status: investment?.status,
        created_at: investment?.created_at,
      }
    })

    return NextResponse.json({ data: investmentPlan })
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

    const investment = {
      user_id: authData.user?.id,
      investment_type: body.investment_type,
      amount: body.amount,
      status: 'active',
      ...body
    }

    const { data, error } = await supabase
      .from('investments')
      .insert(investment)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}