"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { ArrowLeft, Eye, EyeOff, Save, Maximize2, Minimize2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useParams } from "next/navigation"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { UnifiedEducation } from "@/components/unified-education"
import { UnifiedExperience } from "@/components/unified-experience"
import { UnifiedProjects } from "@/components/unified-projects"
import { UnifiedSkills } from "@/components/unified-skills"

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
)

export default function LivePreviewPage() {
  const params = useParams()
  const section = params.section as string
  const { toast } = useToast()
  const [isPreviewMode, setIsPreviewMode] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  const getPreviewComponent = () => {
    switch (section) {
      case "education":
        return <UnifiedEducation />
      case "experience":
        return <UnifiedExperience />
      case "projects":
        return <UnifiedProjects />
      case "skills":
        return <UnifiedSkills />
      default:
        return <div>Section not found</div>
    }
  }

  const getSectionTitle = () => {
    return section.charAt(0).toUpperCase() + section.slice(1)
  }

  return (
    <div className={`h-screen ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Header */}
      <div className="border-b px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-xl font-semibold">Live Preview: {getSectionTitle()}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsPreviewMode(!isPreviewMode)}
          >
            {isPreviewMode ? (
              <>
                <EyeOff className="h-4 w-4 mr-2" />
                Hide Preview
              </>
            ) : (
              <>
                <Eye className="h-4 w-4 mr-2" />
                Show Preview
              </>
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsFullscreen(!isFullscreen)}
          >
            {isFullscreen ? (
              <Minimize2 className="h-4 w-4" />
            ) : (
              <Maximize2 className="h-4 w-4" />
            )}
          </Button>
          <Button asChild>
            <Link href={`/admin/content/${section}`}>
              Edit Content
            </Link>
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="h-[calc(100%-57px)]">
        {isPreviewMode ? (
          <ResizablePanelGroup direction="horizontal" className="h-full">
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full overflow-y-auto p-6">
                <div className="max-w-4xl mx-auto">
                  <h2 className="text-2xl font-bold mb-4">Edit Mode</h2>
                  <Card className="p-6">
                    <p className="text-muted-foreground">
                      Use the regular edit page to make changes. 
                      This preview will update in real-time as you save.
                    </p>
                    <Button asChild className="mt-4">
                      <Link href={`/admin/content/${section}`}>
                        Go to Edit Page
                      </Link>
                    </Button>
                  </Card>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} minSize={30}>
              <div className="h-full overflow-y-auto bg-muted/10">
                <div className="min-h-full">
                  {getPreviewComponent()}
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        ) : (
          <div className="h-full overflow-y-auto">
            {getPreviewComponent()}
          </div>
        )}
      </div>
    </div>
  )
}