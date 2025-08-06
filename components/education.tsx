"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const educationData = [
  {
    institution: "Technical University of Munich",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tum-logo-Ur1AylbzkA5M7dRnaW7j6Q6Yp3FJL5.png",
    degree: "Master of Science in Computer Science",
    period: "2022 – Present",
    location: "Munich, Germany",
  },
  {
    institution: "Atilim University",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/atilim-universitesi-logo-en-lnTPHhTj8df0W1vYj6XJShCKkSTCDN.svg",
    degree: "Bachelor of Science in Computer Engineering",
    period: "2016 – 2021",
    location: "Ankara, Turkey",
    details: "GPA: 3.68/4.00 (Top of the Department)",
  },
  {
    institution: "Poznan University of Technology",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/poznan-university-of-technology-oGuUPBTe1uFgJcniy8UDNl1aEtmXXB.png",
    degree: "Exchange student (Erasmus+) in Computer Science",
    period: "2019 – 2020",
    location: "Poznan, Poland",
  },
]

export function Education() {
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
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.institution}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-24">
                      <Image
                        src={edu.logo || "/placeholder.svg"}
                        alt={`${edu.institution} logo`}
                        fill
                        className="object-contain dark:invert"
                      />
                    </div>
                    <div>
                      <CardTitle>{edu.institution}</CardTitle>
                      <p className="font-medium">{edu.degree}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {edu.period} | {edu.location}
                  </p>
                  {edu.details && <p className="text-sm mt-2">{edu.details}</p>}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

