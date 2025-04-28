import { createClient } from '@/utils/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createClient()
    
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { data, error } = await supabase
      .from('verifications')
      .select('*')
      .eq('user_id', authData.user?.id)
      .order('created_at', { ascending: false })
      .limit(1)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ data: data?.[0] })
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

    const verification = {
      user_id: authData.user?.id,
      document_type: body.document_type,
      document_url: body.document_url,
      status: 'pending',
      ...body
    }

    const { data, error } = await supabase
      .from('verifications')
      .insert(verification)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Create a notification for the verification submission
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        user_id: authData.user?.id,
        title: 'Verification Submitted',
        message: 'Your verification documents have been submitted for review.',
        read: false
      })

    if (notificationError) {
      console.error('Error creating verification notification:', notificationError)
    }

    return NextResponse.json({ data })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()
    
    const { data: authData, error: authError } = await supabase.auth.getUser()
    if (authError) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Only allow updating status if user is admin (you'll need to add admin check)
    const { data: verificationData, error } = await supabase
      .from('verifications')
      .update({ status: body.status })
      .eq('id', body.verificationId)
      .select()
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    // Create a notification for the verification status update
    const { error: notificationError } = await supabase
      .from('notifications')
      .insert({
        user_id: verificationData.user_id,
        title: 'Verification Status Updated',
        message: `Your verification status has been updated to: ${body.status}`,
        read: false
      })

    if (notificationError) {
      console.error('Error creating verification update notification:', notificationError)
    }

    return NextResponse.json({ data: verificationData })
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}