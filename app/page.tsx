import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { UnifiedEducation } from "@/components/unified-education"
import { UnifiedExperience } from "@/components/unified-experience"
import { UnifiedProjects } from "@/components/unified-projects"
import { UnifiedSkills } from "@/components/unified-skills"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <Hero />
      <UnifiedEducation />
      <UnifiedExperience />
      <UnifiedProjects />
      <UnifiedSkills />
      <Footer />
    </div>
  )
}

