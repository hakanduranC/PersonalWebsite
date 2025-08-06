"use client"

import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { ArrowLeft, Plus, Save, Trash2, GripVertical, Eye, EyeOff, Maximize2, Minimize2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import { useParams } from "next/navigation"
import { useQuery, useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import { ImageUpload } from "@/components/image-upload"
import { SortableList } from "@/components/sortable-list"
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { UnifiedEducation } from "@/components/unified-education"
import { UnifiedExperience } from "@/components/unified-experience"
import { UnifiedProjects } from "@/components/unified-projects"
import { UnifiedSkills } from "@/components/unified-skills"

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor"),
  { ssr: false }
)

interface ContentItem {
  _id?: Id<"content">
  section: "education" | "experience" | "projects" | "skills" | "certifications" | "publications"
  title: string
  subtitle?: string
  period?: string
  content: string
  tags?: string[]
  metadata?: {
    logoUrl?: string
    location?: string
    link?: string
    githubUrl?: string
    featured?: boolean
  }
  order: number
  published: boolean
  isNew?: boolean
}

const sectionConfig: Record<string, { 
  title: string
  fields: string[]
  showTags: boolean
  showMetadata: string[]
}> = {
  education: {
    title: "Education",
    fields: ["institution", "degree", "period", "location"],
    showTags: false,
    showMetadata: ["logoUrl", "location"]
  },
  experience: {
    title: "Work Experience", 
    fields: ["company", "position", "period", "location"],
    showTags: false,
    showMetadata: ["logoUrl", "location"]
  },
  projects: {
    title: "Projects",
    fields: ["title", "period"],
    showTags: true,
    showMetadata: ["logoUrl", "link", "githubUrl", "featured"]
  },
  skills: {
    title: "Skills",
    fields: ["category"],
    showTags: true,
    showMetadata: []
  }
}

export default function UniversalContentAdmin() {
  const params = useParams()
  const section = params.section as ContentItem["section"]
  const config = sectionConfig[section] || sectionConfig.projects
  
  const { toast } = useToast()
  const existingItems = useQuery(api.content.getAllBySection, { section })
  const createContent = useMutation(api.content.create)
  const updateContent = useMutation(api.content.update)
  const deleteContent = useMutation(api.content.remove)
  
  const [items, setItems] = useState<ContentItem[]>([])
  const [hasChanges, setHasChanges] = useState(false)
  const [isPreviewMode, setIsPreviewMode] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (existingItems) {
      setItems(existingItems)
    }
  }, [existingItems])
  
  const addItem = () => {
    const newItem: ContentItem = {
      section,
      title: "",
      subtitle: "",
      period: "",
      content: "",
      tags: [],
      order: items.length,
      published: true,
      isNew: true,
      metadata: {
        logoUrl: "",
        location: "",
        link: "",
        githubUrl: "",
        featured: false
      }
    }
    setItems([...items, newItem])
    setHasChanges(true)
  }

  const updateItem = (index: number, updates: Partial<ContentItem>) => {
    setItems(items.map((item, i) => 
      i === index ? { ...item, ...updates } : item
    ))
    setHasChanges(true)
  }

  const deleteItem = async (index: number) => {
    const item = items[index]
    if (item._id) {
      await deleteContent({ id: item._id })
      toast({
        title: "Item deleted",
        description: "The item has been removed.",
      })
    }
    setItems(items.filter((_, i) => i !== index))
    setHasChanges(true)
  }

  const handleSave = async () => {
    try {
      // Update order based on current position
      const itemsWithUpdatedOrder = items.map((item, index) => ({
        ...item,
        order: index
      }))

      for (const item of itemsWithUpdatedOrder) {
        if (item.isNew) {
          const { isNew, _id, ...data } = item
          await createContent({
            ...data,
            section,
            metadata: data.metadata || {},
            tags: data.tags || [],
          })
        } else if (item._id) {
          const { isNew, section: _, _id, _creationTime, ...data } = item as any
          await updateContent({ 
            id: item._id, 
            title: data.title,
            subtitle: data.subtitle,
            period: data.period,
            content: data.content,
            tags: data.tags || [],
            metadata: data.metadata || {},
            order: data.order,
            published: data.published,
          })
        }
      }
      
      toast({
        title: `${config.title} updated`,
        description: "Your changes have been saved successfully.",
      })
      setHasChanges(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleReorder = (newItems: ContentItem[]) => {
    setItems(newItems)
    setHasChanges(true)
  }

  const getFieldLabel = (field: string) => {
    switch(field) {
      case "institution": return "Institution"
      case "degree": return "Degree"
      case "company": return "Company"
      case "position": return "Position"
      case "category": return "Category"
      default: return field.charAt(0).toUpperCase() + field.slice(1)
    }
  }

  // Helper to ensure values are never undefined
  const getValue = (value: any) => value || ""

  // Get the preview component based on section
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

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-background' : 'container py-8'}`}>
      <div className="mb-6 flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/admin">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Manage {config.title}</h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
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
          {isPreviewMode && (
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsFullscreen(!isFullscreen)}
            >
              {isFullscreen ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </Button>
          )}
          <Button onClick={addItem} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Add {section === "skills" ? "Category" : "Item"}
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      {isPreviewMode ? (
        <ResizablePanelGroup 
          direction="horizontal" 
          className={`${isFullscreen ? 'h-[calc(100vh-80px)]' : 'h-[calc(100vh-200px)]'}`}
        >
          <ResizablePanel defaultSize={50} minSize={30}>
            <div className="h-full overflow-y-auto p-4">
              <SortableList
                items={items}
                onReorder={handleReorder}
                keyExtractor={(item) => item._id || `new-${items.indexOf(item)}`}
                renderItem={(item, index) => (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  {section === "skills" ? "Category" : "Item"} #{index + 1}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2">
                    <Label htmlFor={`published-${index}`}>Published</Label>
                    <Switch
                      id={`published-${index}`}
                      checked={item.published}
                      onCheckedChange={(checked) => updateItem(index, { published: checked })}
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => deleteItem(index)}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Dynamic fields based on section */}
              {section === "education" && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        value={getValue(item.title)}
                        onChange={(e) => updateItem(index, { title: e.target.value })}
                        placeholder="University name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        value={getValue(item.subtitle)}
                        onChange={(e) => updateItem(index, { subtitle: e.target.value })}
                        placeholder="Bachelor of Science"
                      />
                    </div>
                  </div>
                </>
              )}

              {section === "experience" && (
                <>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateItem(index, { title: e.target.value })}
                        placeholder="Company name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Position</Label>
                      <Input
                        value={item.subtitle}
                        onChange={(e) => updateItem(index, { subtitle: e.target.value })}
                        placeholder="Software Engineer"
                      />
                    </div>
                  </div>
                </>
              )}

              {section === "projects" && (
                <div className="space-y-2">
                  <Label>Project Name</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateItem(index, { title: e.target.value })}
                    placeholder="My Awesome Project"
                  />
                </div>
              )}

              {section === "skills" && (
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Input
                    value={item.title}
                    onChange={(e) => updateItem(index, { title: e.target.value })}
                    placeholder="Programming Languages"
                  />
                </div>
              )}

              {/* Common fields */}
              {config.fields.includes("period") && (
                <div className="space-y-2">
                  <Label>Period</Label>
                  <Input
                    value={getValue(item.period)}
                    onChange={(e) => updateItem(index, { period: e.target.value })}
                    placeholder="Jan 2023 - Present"
                  />
                </div>
              )}

              {config.showMetadata.includes("location") && (
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    value={getValue(item.metadata?.location)}
                    onChange={(e) => updateItem(index, { 
                      metadata: { ...item.metadata, location: e.target.value }
                    })}
                    placeholder="Munich, Germany"
                  />
                </div>
              )}

              {config.showMetadata.includes("logoUrl") && (
                <ImageUpload
                  value={item.metadata?.logoUrl}
                  onChange={(url) => updateItem(index, { 
                    metadata: { ...item.metadata, logoUrl: url }
                  })}
                  label="Logo"
                />
              )}

              {config.showTags && (
                <div className="space-y-2">
                  <Label>{section === "skills" ? "Skills" : "Technologies"} (comma separated)</Label>
                  <Input
                    value={getValue(item.tags?.join(", "))}
                    onChange={(e) => updateItem(index, { 
                      tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                    })}
                    placeholder={section === "skills" ? "JavaScript, TypeScript, Python" : "React, Node.js, Docker"}
                  />
                </div>
              )}

              <div className="space-y-2">
                <Label>Content (Markdown supported)</Label>
                <MDEditor
                  value={getValue(item.content)}
                  onChange={(value) => updateItem(index, { content: value || "" })}
                  preview="edit"
                  height={200}
                />
              </div>

              {config.showMetadata.includes("link") && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Project Link</Label>
                    <Input
                      value={getValue(item.metadata?.link)}
                      onChange={(e) => updateItem(index, { 
                        metadata: { ...item.metadata, link: e.target.value }
                      })}
                      placeholder="https://project.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>GitHub URL</Label>
                    <Input
                      value={getValue(item.metadata?.githubUrl)}
                      onChange={(e) => updateItem(index, { 
                        metadata: { ...item.metadata, githubUrl: e.target.value }
                      })}
                      placeholder="https://github.com/user/repo"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
                )}
              />
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
        <div className={`${isFullscreen ? '' : 'max-w-4xl mx-auto'}`}>
          <SortableList
            items={items}
            onReorder={handleReorder}
            keyExtractor={(item) => item._id || `new-${items.indexOf(item)}`}
            renderItem={(item, index) => (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>
                      {section === "skills" ? "Category" : "Item"} #{index + 1}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`published-${index}`}>Published</Label>
                        <Switch
                          id={`published-${index}`}
                          checked={item.published}
                          onCheckedChange={(checked) => updateItem(index, { published: checked })}
                        />
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteItem(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Dynamic fields based on section */}
                  {section === "education" && (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Institution</Label>
                          <Input
                            value={getValue(item.title)}
                            onChange={(e) => updateItem(index, { title: e.target.value })}
                            placeholder="University name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Degree</Label>
                          <Input
                            value={getValue(item.subtitle)}
                            onChange={(e) => updateItem(index, { subtitle: e.target.value })}
                            placeholder="Bachelor of Science"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {section === "experience" && (
                    <>
                      <div className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                          <Label>Company</Label>
                          <Input
                            value={item.title}
                            onChange={(e) => updateItem(index, { title: e.target.value })}
                            placeholder="Company name"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>Position</Label>
                          <Input
                            value={item.subtitle}
                            onChange={(e) => updateItem(index, { subtitle: e.target.value })}
                            placeholder="Software Engineer"
                          />
                        </div>
                      </div>
                    </>
                  )}

                  {section === "projects" && (
                    <div className="space-y-2">
                      <Label>Project Name</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateItem(index, { title: e.target.value })}
                        placeholder="My Awesome Project"
                      />
                    </div>
                  )}

                  {section === "skills" && (
                    <div className="space-y-2">
                      <Label>Category</Label>
                      <Input
                        value={item.title}
                        onChange={(e) => updateItem(index, { title: e.target.value })}
                        placeholder="Programming Languages"
                      />
                    </div>
                  )}

                  {/* Common fields */}
                  {config.fields.includes("period") && (
                    <div className="space-y-2">
                      <Label>Period</Label>
                      <Input
                        value={getValue(item.period)}
                        onChange={(e) => updateItem(index, { period: e.target.value })}
                        placeholder="Jan 2023 - Present"
                      />
                    </div>
                  )}

                  {config.showMetadata.includes("location") && (
                    <div className="space-y-2">
                      <Label>Location</Label>
                      <Input
                        value={getValue(item.metadata?.location)}
                        onChange={(e) => updateItem(index, { 
                          metadata: { ...item.metadata, location: e.target.value }
                        })}
                        placeholder="Munich, Germany"
                      />
                    </div>
                  )}

                  {config.showMetadata.includes("logoUrl") && (
                    <ImageUpload
                      value={item.metadata?.logoUrl}
                      onChange={(url) => updateItem(index, { 
                        metadata: { ...item.metadata, logoUrl: url }
                      })}
                      label="Logo"
                    />
                  )}

                  {config.showTags && (
                    <div className="space-y-2">
                      <Label>{section === "skills" ? "Skills" : "Technologies"} (comma separated)</Label>
                      <Input
                        value={getValue(item.tags?.join(", "))}
                        onChange={(e) => updateItem(index, { 
                          tags: e.target.value.split(",").map(t => t.trim()).filter(Boolean)
                        })}
                        placeholder={section === "skills" ? "JavaScript, TypeScript, Python" : "React, Node.js, Docker"}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label>Content (Markdown supported)</Label>
                    <MDEditor
                      value={getValue(item.content)}
                      onChange={(value) => updateItem(index, { content: value || "" })}
                      preview="edit"
                      height={200}
                    />
                  </div>

                  {config.showMetadata.includes("link") && (
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-2">
                        <Label>Project Link</Label>
                        <Input
                          value={getValue(item.metadata?.link)}
                          onChange={(e) => updateItem(index, { 
                            metadata: { ...item.metadata, link: e.target.value }
                          })}
                          placeholder="https://project.com"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>GitHub URL</Label>
                        <Input
                          value={getValue(item.metadata?.githubUrl)}
                          onChange={(e) => updateItem(index, { 
                            metadata: { ...item.metadata, githubUrl: e.target.value }
                          })}
                          placeholder="https://github.com/user/repo"
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          />
        </div>
      )}
    </div>
  )
}