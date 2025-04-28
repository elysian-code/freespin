import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()
    
    const data = {
      email: body.email.trim(),
      username: body.username.trim(),
      phone_no: body.phone_no.trim(),
      password: body.password.trim(),
    }

    const { data: user, error } = await supabase.auth.signUp(data)

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      )
    }

    // Create user profile
    const { error: userInsertError } = await supabase.from('user_profiles').insert([
      {
        id: user?.user?.id,
        phone_number: data.phone_no,
        email: data.email,
        full_name: data.username,
      },
    ])

    if (userInsertError) {
      return NextResponse.json(
        { error: userInsertError.message },
        { status: 400 }
      )
    }

    // Initialize wallet
    const { error: walletError } = await supabase
      .from('wallets')
      .insert([{ user_id: user?.user?.id, balance: 0 }])

    if (walletError) {
      return NextResponse.json(
        { error: walletError.message },
        { status: 400 }
      )
    }

    return NextResponse.json({ 
      success: true,
      data: user?.user
    })
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}