"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail, Phone } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { ConvexImage } from "./convex-image"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function Hero() {
  const profile = useQuery(api.profile.get)
  
  const defaultProfile = {
    name: "Hakan Duran",
    title: "Full Stack Developer - Computer Engineer",
    bio: "Master's student in Computer Science at Technical University of Munich, passionate about full-stack development and innovative tech solutions.",
    avatarUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-23%20at%2020.00.41-5xkYOpSc9tXGIREUnjLvVvLhiHnXTT.jpeg",
    backgroundUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-23%20at%2019.58.49-SDmQj4rH742nrwfKgfygkylQ4mHsej.jpeg",
    email: "contact@hakanduran.me",
    phone: "+491776247093",
    linkedin: "https://linkedin.com/in/hakanduran98",
    github: "https://github.com/hakanduran98"
  }
  
  const data = profile || defaultProfile

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 -z-10">
        <ConvexImage
          src={data.backgroundUrl || defaultProfile.backgroundUrl}
          alt="Background"
          fill
          className="object-cover opacity-10 blur-sm"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background" />
      </div>
      <div className="container relative pt-20 pb-32 md:pt-32 md:pb-40">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px] items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                <span className="text-primary inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10">
                  {data.title}
                </span>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80"
              >
                Hey, I'm {data.name}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="max-w-[600px] text-muted-foreground md:text-xl dark:text-gray-400"
              >
                {data.bio}
              </motion.p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-col gap-4 min-[400px]:flex-row"
            >
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="#projects">
                  View My Projects <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href={data.github}>
                    <Github className="h-5 w-5" />
                    <span className="sr-only">GitHub</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={data.linkedin}>
                    <Linkedin className="h-5 w-5" />
                    <span className="sr-only">LinkedIn</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`mailto:${data.email}`}>
                    <Mail className="h-5 w-5" />
                    <span className="sr-only">Email</span>
                  </Link>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <Link href={`tel:${data.phone}`}>
                    <Phone className="h-5 w-5" />
                    <span className="sr-only">Phone</span>
                  </Link>
                </Button>
              </div>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto lg:ml-auto"
          >
            <div className="relative w-[280px] h-[280px] md:w-[400px] md:h-[400px]">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-primary/0 animate-rotate-slow" />
              <div className="absolute inset-[3px] rounded-full bg-gradient-to-tr from-primary/30 to-primary/0 animate-rotate-slow animation-delay-500" />
              <div className="absolute inset-[6px] rounded-full overflow-hidden border-2 border-primary/10">
                <ConvexImage
                  src={data.avatarUrl || defaultProfile.avatarUrl}
                  alt="Hakan Duran"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

