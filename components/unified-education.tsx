"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import ReactMarkdown from 'react-markdown'

export function UnifiedEducation() {
  const education = useQuery(api.content.getBySection, { section: "education" })

  if (!education) return null

  return (
    <section className="py-16" id="education">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Education</h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {education.map((edu, index) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    {edu.metadata?.logoUrl && (
                      <div className="relative h-12 w-24">
                        <Image
                          src={edu.metadata.logoUrl}
                          alt={`${edu.title} logo`}
                          fill
                          className="object-contain dark:invert"
                        />
                      </div>
                    )}
                    <div>
                      <CardTitle>{edu.title}</CardTitle>
                      <p className="font-medium">{edu.subtitle}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {edu.period} {edu.metadata?.location && `| ${edu.metadata.location}`}
                  </p>
                  {edu.content && (
                    <div className="prose prose-sm dark:prose-invert max-w-none mt-2">
                      <ReactMarkdown>{edu.content}</ReactMarkdown>
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