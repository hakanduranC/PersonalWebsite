"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { ConvexImage } from "./convex-image"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import ReactMarkdown from 'react-markdown'

export function UnifiedExperience() {
  const experiences = useQuery(api.content.getBySection, { section: "experience" })

  if (!experiences) return null

  return (
    <section className="py-16 relative" id="experience">
      <div className="absolute inset-0 -z-10">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-23%20at%2019.57.55-d2XMyR8u0ApnyR2xaLeEMxP70D0OSJ.jpeg"
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
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Work Experience</h2>
        </motion.div>
        <div className="grid gap-8">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {exp.metadata?.logoUrl && (
                      <div className="relative h-12 w-24">
                        <ConvexImage
                          src={exp.metadata.logoUrl}
                          alt={`${exp.title} logo`}
                          fill
                          className="object-contain dark:invert"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle>{exp.subtitle}</CardTitle>
                      <p className="font-medium">{exp.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.period} {exp.metadata?.location && `| ${exp.metadata.location}`}
                  </p>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <ReactMarkdown
                      components={{
                        ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                        li: ({ children }) => <li className="text-sm">{children}</li>,
                      }}
                    >
                      {exp.content}
                    </ReactMarkdown>
                  </div>
                  {exp.tags && exp.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      {exp.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}