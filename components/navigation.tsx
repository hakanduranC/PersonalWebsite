"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ModeToggle } from "./mode-toggle"

const links = [
  { href: "/", label: "Home" },
  { href: "#education", label: "Education" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
  { href: "/HakanDuranCV.pdf", label: "CV", download: true },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block">Hakan Duran</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {links.map((link) => (
              link.download ? (
                <a
                  key={link.href}
                  href={link.href}
                  download
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    "text-foreground/60"
                  )}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "transition-colors hover:text-foreground/80",
                    pathname === link.href ? "text-foreground" : "text-foreground/60",
                  )}
                  onClick={(e) => {
                    if (link.href.startsWith('#')) {
                      e.preventDefault()
                      const element = document.querySelector(link.href)
                      element?.scrollIntoView({ behavior: 'smooth' })
                    }
                  }}
                >
                  {link.label}
                </Link>
              )
            ))}
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none"></div>
          <ModeToggle />
        </div>
      </div>
    </header>
  )
}

