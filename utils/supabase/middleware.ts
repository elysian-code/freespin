import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const requestHeaders = new Headers(request.headers)
  
  // Ensure headers are consistent for Server Actions
  if (forwardedHost?.includes('.app.github.dev')) {
    requestHeaders.set('origin', `https://${forwardedHost}`)
  }

  let supabaseResponse = NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          supabaseResponse.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          supabaseResponse.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Refresh the auth token
  await supabase.auth.getUser()

  // Ensure response headers are consistent
  if (forwardedHost?.includes('.app.github.dev')) {
    supabaseResponse.headers.set('origin', `https://${forwardedHost}`)
  }

  return supabaseResponse
}