"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function DebugPage() {
  const debugInfo = useQuery(api.debug.checkContent)

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Debug Database</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Database Status</CardTitle>
        </CardHeader>
        <CardContent>
          {debugInfo ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold">Total Content Items: {debugInfo.contentCount}</h3>
              </div>
              
              <div>
                <h3 className="font-semibold">Content by Section:</h3>
                <ul className="list-disc pl-5">
                  <li>Education: {debugInfo.contentBySection.education}</li>
                  <li>Experience: {debugInfo.contentBySection.experience}</li>
                  <li>Projects: {debugInfo.contentBySection.projects}</li>
                  <li>Skills: {debugInfo.contentBySection.skills}</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold">Profile Exists: {debugInfo.profileExists ? "Yes" : "No"}</h3>
              </div>

              {debugInfo.sampleContent.length > 0 && (
                <div>
                  <h3 className="font-semibold">Sample Content:</h3>
                  <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto">
                    {JSON.stringify(debugInfo.sampleContent, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </CardContent>
      </Card>
    </div>
  )
}