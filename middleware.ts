import { NextResponse, type NextRequest } from 'next/server'
import { createServerClient, type CookieOptions } from '@supabase/ssr'

// Add routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/', '/auth/confirm', '/error']

export async function middleware(request: NextRequest) {
  const requestUrl = new URL(request.url)
  
  // Skip auth check for public routes
  if (publicRoutes.includes(requestUrl.pathname)) {
    return NextResponse.next()
  }

  // Create a response with the updated cookies
  let response = NextResponse.next()

  // Create a Supabase client configured to use cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.delete({
            name,
            ...options,
          })
        },
      },
    }
  )

  // Check auth status
  const { data: { session }, error } = await supabase.auth.getSession()

  // Handle session errors by redirecting to login
  if (error || !session) {
    const redirectUrl = new URL('/login', requestUrl.origin)
    redirectUrl.searchParams.set('redirect', requestUrl.pathname)
    return NextResponse.redirect(redirectUrl)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (public folder)
     * - auth/confirm (email verification endpoint)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|auth/confirm).*)',
  ],
}