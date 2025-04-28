import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')
    const type = requestUrl.searchParams.get('type')

    if (!code) {
      return NextResponse.redirect(new URL('/error?message=Missing verification code', requestUrl))
    }

    const cookieStore = cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name: string) {
            return cookieStore.get(name)?.value
          },
          set(name: string, value: string, options: any) {
            cookieStore.set({ name, value, ...options })
          },
          remove(name: string, options: any) {
            cookieStore.delete(name)
          },
        },
      }
    )

    // Exchange the code for a session
    const { error: verificationError } = await supabase.auth.exchangeCodeForSession(code)

    if (verificationError) {
      console.error('Verification error:', verificationError)
      return NextResponse.redirect(
        new URL(`/error?message=${encodeURIComponent(verificationError.message)}`, requestUrl)
      )
    }

    // Get the newly created session
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session) {
      console.error('Session error:', sessionError)
      return NextResponse.redirect(
        new URL('/error?message=Failed to create session', requestUrl)
      )
    }

    // For email confirmation specifically
    if (type === 'signup' || type === 'email') {
      // Update user metadata in the profiles table
      const { error: updateError } = await supabase
        .from('user_profiles')
        .upsert({
          id: session.user.id,
          email: session.user.email,
          email_verified: true,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'id'
        })

      if (updateError) {
        console.error('Profile update error:', updateError)
        // Continue anyway as the session is still valid
      }
    }

    // Create the response with redirect
    const response = NextResponse.redirect(new URL('/dashboard', requestUrl))

    // Set the auth cookie
    const { data: { session: refreshedSession }, error: refreshError } = 
      await supabase.auth.setSession(session)

    if (refreshError) {
      console.error('Session refresh error:', refreshError)
      return NextResponse.redirect(
        new URL('/error?message=Failed to set session', requestUrl)
      )
    }

    // Set auth cookies explicitly
    response.cookies.set('sb-access-token', session.access_token, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 // 1 hour
    })

    response.cookies.set('sb-refresh-token', session.refresh_token!, {
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 1 week
    })

    return response
  } catch (error) {
    console.error('Unexpected error during confirmation:', error)
    return NextResponse.redirect(
      new URL('/error?message=Authentication failed', request.url)
    )
  }
}
