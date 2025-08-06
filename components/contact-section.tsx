"use client"

import { motion } from "framer-motion"
import { ContactForm } from "./contact-form"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react"
import Link from "next/link"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function ContactSection() {
  const profile = useQuery(api.profile.get)
  
  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: profile?.email || "contact@hakanduran.me",
      href: `mailto:${profile?.email || "contact@hakanduran.me"}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile?.phone || "+491776247093",
      href: `tel:${profile?.phone || "+491776247093"}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Munich, Germany",
      href: null,
    },
  ]

  const socialLinks = [
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: profile?.linkedin || "https://linkedin.com/in/hakanduran98",
    },
    {
      icon: Github,
      label: "GitHub",
      href: profile?.github || "https://github.com/hakanduran98",
    },
  ]

  return (
    <section className="py-16 relative" id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Let's Connect
          </h2>
          <p className="text-muted-foreground text-lg">
            Have a project in mind? Let's discuss how we can work together.
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <ContactForm />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  return (
                    <div key={item.label} className="flex items-center gap-3">
                      <Icon className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">{item.label}</p>
                        {item.href ? (
                          <Link
                            href={item.href}
                            className="font-medium hover:underline"
                          >
                            {item.value}
                          </Link>
                        ) : (
                          <p className="font-medium">{item.value}</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Follow Me</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex gap-4">
                  {socialLinks.map((link) => {
                    const Icon = link.icon
                    return (
                      <Link
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center w-10 h-10 rounded-full bg-secondary hover:bg-secondary/80 transition-colors"
                        aria-label={link.label}
                      >
                        <Icon className="h-5 w-5" />
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Office Hours</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Available for freelance projects and consultations.
                </p>
                <p className="font-medium mt-2">
                  Monday - Friday: 9:00 AM - 6:00 PM CET
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Response time: Within 24 hours
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  )
}