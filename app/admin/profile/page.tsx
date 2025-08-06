"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
)

interface ProfileData {
  name: string
  title: string
  bio: string
  avatarUrl: string
  backgroundUrl: string
  email: string
  phone: string
  linkedin: string
  github: string
}

export default function ProfileAdmin() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const existingProfile = useQuery(api.profile.get)
  const updateProfile = useMutation(api.profile.update)
  
  const [profile, setProfile] = useState<ProfileData>({
    name: "Hakan Duran",
    title: "Full Stack Developer - Computer Engineer",
    bio: "Master's student in Computer Science at Technical University of Munich, passionate about full-stack development and innovative tech solutions.",
    avatarUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-23%20at%2020.00.41-5xkYOpSc9tXGIREUnjLvVvLhiHnXTT.jpeg",
    backgroundUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-23%20at%2019.58.49-SDmQj4rH742nrwfKgfygkylQ4mHsej.jpeg",
    email: "contact@hakanduran.me",
    phone: "+491776247093",
    linkedin: "https://linkedin.com/in/hakanduran98",
    github: "https://github.com/hakanduran98"
  })

  useEffect(() => {
    if (existingProfile) {
      setProfile({
        name: existingProfile.name,
        title: existingProfile.title,
        bio: existingProfile.bio,
        avatarUrl: existingProfile.avatarUrl || profile.avatarUrl,
        backgroundUrl: existingProfile.backgroundUrl || profile.backgroundUrl,
        email: existingProfile.email,
        phone: existingProfile.phone,
        linkedin: existingProfile.linkedin,
        github: existingProfile.github,
      })
    }
  }, [existingProfile])

  const handleSave = async () => {
    setLoading(true)
    try {
      await updateProfile({
        ...profile,
        avatarUrl: profile.avatarUrl || undefined,
        backgroundUrl: profile.backgroundUrl || undefined,
      })
      toast({
        title: "Profile updated",
        description: "Your profile has been successfully updated.",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container py-8 max-w-4xl">
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Edit Profile</h1>
        </div>
        <Button onClick={handleSave} disabled={loading}>
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update your personal information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={profile.name}
                  onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Professional Title</Label>
                <Input
                  id="title"
                  value={profile.title}
                  onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio (Markdown supported)</Label>
              <MDEditor
                value={profile.bio}
                onChange={(value) => setProfile({ ...profile, bio: value || "" })}
                preview="edit"
                height={200}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
            <CardDescription>How people can reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={profile.phone}
                  onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="linkedin">LinkedIn URL</Label>
                <Input
                  id="linkedin"
                  value={profile.linkedin}
                  onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="github">GitHub URL</Label>
                <Input
                  id="github"
                  value={profile.github}
                  onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Media</CardTitle>
            <CardDescription>Profile and background images</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="avatarUrl">Avatar URL</Label>
              <Input
                id="avatarUrl"
                value={profile.avatarUrl}
                onChange={(e) => setProfile({ ...profile, avatarUrl: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="backgroundUrl">Background Image URL</Label>
              <Input
                id="backgroundUrl"
                value={profile.backgroundUrl}
                onChange={(e) => setProfile({ ...profile, backgroundUrl: e.target.value })}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}