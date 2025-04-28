'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default function ErrorPage() {
  const searchParams = useSearchParams()
  const error = searchParams.get('error')

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            <CardTitle>Authentication Error</CardTitle>
          </div>
          <CardDescription>
            {error || 'An error occurred during authentication'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p>This could happen for several reasons:</p>
          <ul className="list-disc pl-4 mt-2 space-y-1">
            <li>The link has expired</li>
            <li>The link has already been used</li>
            <li>The link is invalid or has been tampered with</li>
          </ul>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button asChild className="w-full">
            <Link href="/login">Try logging in again</Link>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <Link href="/">Return to home page</Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}