"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ConvexImage } from "./convex-image"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import ReactMarkdown from 'react-markdown'

export function UnifiedProjects() {
  const projects = useQuery(api.content.getBySection, { section: "projects" })

  if (!projects) return null

  return (
    <section className="py-16 relative" id="projects">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-23%20at%2020.02.07-BmucPkmrWuVLIrKqBHHNuDQxi4yjzr.jpeg"
          alt="Background"
          fill
          className="object-cover opacity-5"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Projects</h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  {project.metadata?.logoUrl && (
                    <div className="relative h-12 w-24 mb-4">
                      <ConvexImage
                        src={project.metadata.logoUrl}
                        alt={`${project.title} logo`}
                        fill
                        className="object-contain dark:invert"
                      />
                    </div>
                  )}
                  <CardTitle>{project.title}</CardTitle>
                  {project.period && <CardDescription>{project.period}</CardDescription>}
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="prose prose-sm dark:prose-invert max-w-none mb-4">
                    <ReactMarkdown>{project.content}</ReactMarkdown>
                  </div>
                  {project.tags && project.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
                <div className="p-6 pt-0 flex gap-4">
                  {project.metadata?.link && (
                    <Link href={project.metadata.link} className="text-primary hover:underline inline-flex items-center">
                      View Project <ExternalLink className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                  {project.metadata?.githubUrl && (
                    <Link href={project.metadata.githubUrl} className="text-primary hover:underline inline-flex items-center">
                      GitHub <Github className="ml-2 h-4 w-4" />
                    </Link>
                  )}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}