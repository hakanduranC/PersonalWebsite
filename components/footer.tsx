"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"

export function Footer() {
  const profile = useQuery(api.profile.get)
  const name = profile?.name || "Hakan Duran"
  const githubUrl = profile?.github || "https://github.com/hakanduran98"
  
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built with Next.js, Tailwind CSS, and Vercel.{" "}
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="font-medium underline underline-offset-4"
          >
            GitHub
          </a>
        </p>
        <p className="text-center text-sm text-muted-foreground md:text-left">
          © {new Date().getFullYear()} {name}. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

