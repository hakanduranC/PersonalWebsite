"use client"

import { useUser } from "@clerk/nextjs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Copy, ExternalLink } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function SetupAdminPage() {
  const { user, isLoaded } = useUser()
  const { toast } = useToast()

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "User ID copied to clipboard",
    })
  }

  if (!isLoaded) {
    return <div className="container py-8">Loading...</div>
  }

  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8">Setup Admin Access</h1>
      
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your User Information</CardTitle>
            <CardDescription>Current signed-in user details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-mono">{user?.primaryEmailAddress?.emailAddress}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">User ID</p>
              <div className="flex items-center gap-2">
                <p className="font-mono">{user?.id}</p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => copyToClipboard(user?.id || "")}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Current Role</p>
              <p className="font-mono">{user?.publicMetadata?.role || "none"}</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Set Yourself as Admin</CardTitle>
            <CardDescription>Follow these steps in the Clerk Dashboard</CardDescription>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4 list-decimal list-inside">
              <li>
                <strong>Go to Clerk Dashboard</strong>
                <br />
                <Button asChild variant="link" className="h-auto p-0">
                  <a 
                    href="https://dashboard.clerk.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    Open Clerk Dashboard
                    <ExternalLink className="ml-1 h-3 w-3" />
                  </a>
                </Button>
              </li>
              
              <li>
                <strong>Find your user</strong>
                <br />
                <span className="text-sm text-muted-foreground">
                  Go to "Users" → Search for your email: {user?.primaryEmailAddress?.emailAddress}
                </span>
              </li>
              
              <li>
                <strong>Edit Public Metadata</strong>
                <br />
                <span className="text-sm text-muted-foreground">
                  Click on your user → Scroll to "Public metadata" → Click "Edit"
                </span>
              </li>
              
              <li>
                <strong>Add admin role</strong>
                <br />
                <span className="text-sm text-muted-foreground">Add this JSON:</span>
                <pre className="mt-2 p-3 bg-muted rounded-md text-sm">
{`{
  "role": "admin"
}`}
                </pre>
              </li>
              
              <li>
                <strong>Configure Session Token</strong>
                <br />
                <span className="text-sm text-muted-foreground">
                  Go to "Sessions" → Click "Edit" on session token → Add:
                </span>
                <pre className="mt-2 p-3 bg-muted rounded-md text-sm">
{`{
  "metadata": "{{user.public_metadata}}"
}`}
                </pre>
              </li>
              
              <li>
                <strong>Save and refresh</strong>
                <br />
                <span className="text-sm text-muted-foreground">
                  Save changes, then sign out and sign back in for changes to take effect
                </span>
              </li>
            </ol>
          </CardContent>
        </Card>

        <Card className="border-primary">
          <CardHeader>
            <CardTitle>Why This Approach?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p>Using Clerk's public metadata for roles is the recommended approach because:</p>
            <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
              <li>It's built into Clerk's authentication system</li>
              <li>Roles are included in the session token automatically</li>
              <li>You can manage admins directly from Clerk Dashboard</li>
              <li>No need to maintain a separate list of emails or user IDs</li>
              <li>Easy to add more roles (moderator, editor, etc.) in the future</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}