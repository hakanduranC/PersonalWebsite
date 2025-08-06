"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const projects = [
  {
    title: "CommonRoad and ARCH Submission Systems",
    description:
      "Master-Worker Architecture systems for processing, grading, and storing submissions, and facilitated user competitions.",
    period: "November 2022 - Present",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CommonRoad-cehhXCbWRQabJSHdiu25vmLbu8opfX.svg",
    tags: ["Django", "React", "S3 Buckets", "PostgreSQL", "RabbitMQ", "Swagger", "Docker", "Gitlab CI"],
    link: "#",
  },
  {
    title: "Connactz SetList Integration with Spotify",
    description:
      "Developed an internal tool for the Connactz platform, enabling users to create Setlists using Spotify.",
    period: "October 2023 – March 2024",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/con-O8upI8GPTV4QmEngQ9db2NXCvU6uti.svg",
    tags: ["Angular", "Drupal"],
    link: "#",
  },
  {
    title: "E-Farmers",
    description:
      "E-commerce graduation project with React.js frontend, Django REST API backend, and smart box design using Arduino.",
    period: "January 2021 - June 2021",
    tags: ["React", "Django", "PostgreSQL", "Amazon RDS", "Amazon S3", "Heroku", "Arduino"],
    link: "#",
  },
]

export function Projects() {
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
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  {project.logo && (
                    <div className="relative h-12 w-24 mb-4">
                      <Image
                        src={project.logo || "/placeholder.svg"}
                        alt={`${project.title} logo`}
                        fill
                        className="object-contain"
                      />
                    </div>
                  )}
                  <CardTitle>{project.title}</CardTitle>
                  <CardDescription>{project.period}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <div className="p-6 pt-0">
                  <Link href={project.link} className="text-primary hover:underline inline-flex items-center">
                    View Project <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

