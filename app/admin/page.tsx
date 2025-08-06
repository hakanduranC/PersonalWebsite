"use client"

import { useUser } from "@clerk/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { User, FileText, Briefcase, GraduationCap, FolderOpen, Wrench } from "lucide-react"

export default function AdminDashboard() {
  const { user } = useUser()

  const sections = [
    { title: "Profile", description: "Edit your personal information", icon: User, href: "/admin/profile" },
    { title: "Experience", description: "Manage work experience", icon: Briefcase, href: "/admin/content/experience" },
    { title: "Education", description: "Update education details", icon: GraduationCap, href: "/admin/content/education" },
    { title: "Projects", description: "Showcase your projects", icon: FolderOpen, href: "/admin/content/projects" },
    { title: "Skills", description: "List your technical skills", icon: Wrench, href: "/admin/content/skills" },
  ]

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome back, {user?.firstName || "Admin"}! Manage your portfolio content here.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Card key={section.href} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
                <CardDescription>{section.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <Link href={section.href}>
                    Manage {section.title}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}