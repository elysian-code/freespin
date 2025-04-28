import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation"

export default async function LoggedInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // If user is already logged in, redirect to dashboard
  if (user) {
    redirect('/dashboard')
  }

  // Otherwise, render the login page
  return <>{children}</>
}