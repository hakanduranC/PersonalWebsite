"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function SeedPage() {
  const seedData = useMutation(api.seed.seedData)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<string>("")

  const handleSeed = async () => {
    setLoading(true)
    try {
      const response = await seedData()
      setResult(response.message)
    } catch (error) {
      setResult("Error: " + (error as Error).message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8 max-w-2xl">
      <div className="mb-6 flex items-center gap-4">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Seed Database</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Initialize Database with Default Data</CardTitle>
          <CardDescription>
            This will populate your database with all the existing content from your CV.
            This operation will only run once - if data already exists, it will be skipped.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button 
              onClick={handleSeed} 
              disabled={loading}
              className="w-full"
            >
              {loading ? "Seeding..." : "Seed Database"}
            </Button>
            
            {result && (
              <div className={`p-4 rounded ${result.includes("Error") ? "bg-red-100" : "bg-green-100"}`}>
                {result}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}