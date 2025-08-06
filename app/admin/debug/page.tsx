"use client"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DebugPage() {
  const { user, isLoaded } = useUser()

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">Debug User Information</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Current User Data</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs overflow-auto">
            {JSON.stringify({
              id: user?.id,
              primaryEmail: user?.primaryEmailAddress?.emailAddress,
              emailAddresses: user?.emailAddresses?.map(e => e.emailAddress),
              username: user?.username,
              firstName: user?.firstName,
              lastName: user?.lastName,
              fullName: user?.fullName,
            }, null, 2)}
          </pre>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Raw User Object</CardTitle>
        </CardHeader>
        <CardContent>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(user, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </div>
  )
}