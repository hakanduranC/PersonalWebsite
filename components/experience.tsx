"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

const experienceData = [
  {
    company: "Everstox GmbH",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/everstox2-SBlviJdAdil5FWxEzfPJtUnnPmKbHA.png",
    position: "IT & Media Working Student",
    period: "May 2023 – Present",
    location: "Munich, Germany",
    details: [
      "Responsible for office IT infrastructure, including hardware management, network troubleshooting, and software deployments.",
      "Managed Microsoft Intune for device enrollment, compliance policies, and security configurations.",
      "Developed and maintained AWS Lambda functions for automation tasks and system integrations.",
      "Handled AWS secret key management, ensuring secure storage and controlled access.",
      "Worked with Terraform to provision and manage cloud resources efficiently.",
      "Provided technical support for employees, troubleshooting software and hardware issues.",
      "Assisted in IT asset tracking, procurement, and documentation.",
    ],
  },
  {
    company: "Technical University Of Munich",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/tum-logo-Ur1AylbzkA5M7dRnaW7j6Q6Yp3FJL5.png",
    position: "Full Stack Web Developer - Hiwi Assistant",
    period: "November 2022 – May 2023",
    location: "Munich, Germany",
    details: [
      "Participated in TUM's CommonRoad project, focusing on web application development and maintenance.",
      "Implemented a Docker-driven, master-worker architecture for handling academic and competition submissions.",
      "Applied React and Material UI for front-end development; Django and PostgreSQL for back-end.",
      "Managed full spectrum of front-end, back-end, and DevOps tasks.",
      "Played a key role in establishing the submission system infrastructure for the ARCH project, applying innovative tech solutions.",
    ],
  },
  {
    company: "Blickfeld Gmbh",
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo-blickfeld-RnRJ719COyPc0STRooDqkXeDA2OwaH.svg",
    position: "Software Developer Intern",
    period: "October 2021 – March 2022",
    location: "Munich, Germany",
    details: [
      "Developed software solutions to enhance efficiency and coordination across teams at Blickfeld GmbH.",
      "Involved in an advanced Django project, focusing on creating and implementing endpoints in the Django Rest API.",
      "Engineered various algorithms for these endpoints to optimize functionality.",
      "Created React applications capable of utilizing the developed endpoints.",
      "Gained practical experience with Docker.",
      "Proficient in setting up and managing Git pipelines.",
    ],
  },
]

export function Experience() {
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
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="relative h-12 w-24">
                      <Image
                        src={exp.logo || "/placeholder.svg"}
                        alt={`${exp.company} logo`}
                        fill
                        className="object-contain dark:invert"
                      />
                    </div>
                    <div>
                      <CardTitle>{exp.position}</CardTitle>
                      <p className="font-medium">{exp.company}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-2">
                    {exp.period} | {exp.location}
                  </p>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.details.map((detail, i) => (
                      <li key={i} className="text-sm">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

