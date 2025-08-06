"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function UnifiedSkills() {
  const skills = useQuery(api.content.getBySection, { section: "skills" })

  // Fallback to existing data if no data in database yet
  const defaultSkillsData = [
    {
      category: "Programming Languages",
      skills: ["Python", "C/C++", "C#", "JavaScript", "SQL"],
    },
    {
      category: "Front-end Frameworks",
      skills: ["React", "Angular (basic)"],
    },
    {
      category: "Back-end Frameworks",
      skills: ["Django", "Node (basic)", ".Net Core (basic)", "Flask (basic)", "Drupal (basic)"],
    },
    {
      category: "Cloud & DevOps",
      skills: ["AWS Lambda", "Terraform", "Docker", "GitLab CI", "Microsoft Intune"],
    },
    {
      category: "Databases",
      skills: ["PostgreSQL", "MySQL"],
    },
    {
      category: "Tools & Technologies",
      skills: ["Git", "AWS S3", "AWS RDS", "Heroku", "Arduino"],
    },
    {
      category: "Areas",
      skills: [
        "Software Engineering",
        "IT Infrastructure Management",
        "Cloud Computing",
        "Security and Privacy",
        "UI/UX Web Design",
        "REST API Development",
        "AI and Deep Learning (introductory)",
      ],
    },
    {
      category: "Languages",
      skills: ["Turkish (native)", "English (B2 certified)", "German (A2 in use)"],
    },
  ]

  // Use database data if available, otherwise use default
  const skillsData = skills && skills.length > 0 
    ? skills.map(skill => ({
        category: skill.title,
        skills: skill.tags || []
      }))
    : defaultSkillsData

  return (
    <section className="py-16" id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Skills</h2>
        </motion.div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {skillsData.map((category, index) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>{category.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}