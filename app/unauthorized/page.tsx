"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ShieldOff } from "lucide-react"
import { useClerk, useUser } from "@clerk/nextjs"

export default function UnauthorizedPage() {
  const { signOut } = useClerk()
  const { user } = useUser()

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <ShieldOff className="h-16 w-16 text-destructive mx-auto" />
        <h1 className="text-4xl font-bold">Unauthorized Access</h1>
        <p className="text-muted-foreground max-w-md mx-auto">
          You don't have permission to access the admin panel. 
          This area is restricted to authorized administrators only.
        </p>
        {user && (
          <p className="text-sm text-muted-foreground">
            Signed in as: {user.primaryEmailAddress?.emailAddress}
          </p>
        )}
        <div className="flex flex-wrap gap-4 justify-center">
          <Button asChild>
            <Link href="/">Go to Homepage</Link>
          </Button>
          <Button 
            variant="outline" 
            onClick={() => signOut({ redirectUrl: "/" })}
          >
            Sign Out
          </Button>
          {user?.primaryEmailAddress?.emailAddress === 'hakanduranyt@gmail.com' && (
            <Button variant="secondary" asChild>
              <Link href="/setup-admin">Setup Admin Access</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}