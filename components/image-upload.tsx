"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "convex/react"
import { api } from "@/convex/_generated/api"
import { ConvexImage } from "./convex-image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  label?: string
  accept?: string
}

export function ImageUpload({ 
  value, 
  onChange, 
  label = "Upload Image",
  accept = "image/*"
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [preview, setPreview] = useState(value)
  const { toast } = useToast()
  
  const generateUploadUrl = useMutation(api.files.generateUploadUrl)

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select a file smaller than 10MB",
        variant: "destructive"
      })
      return
    }

    setIsUploading(true)

    try {
      // Get upload URL from Convex
      const uploadUrl = await generateUploadUrl()

      // Upload the file
      const result = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      })

      if (!result.ok) {
        throw new Error("Upload failed")
      }

      const { storageId } = await result.json()

      // Store the storage ID as the value
      // The actual URL will be resolved when displaying the image
      const storageUrl = `storage:${storageId}`
      
      setPreview(storageUrl)
      onChange(storageUrl)
      
      toast({
        title: "Image uploaded",
        description: "Your image has been uploaded successfully",
      })
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    setPreview(undefined)
    onChange("")
  }

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      
      {preview ? (
        <div className="relative w-32 h-32 rounded-lg overflow-hidden border">
          <ConvexImage
            src={preview}
            alt="Upload preview"
            fill
            className="object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6"
            onClick={handleRemove}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="relative">
          <Input
            type="file"
            accept={accept}
            onChange={handleUpload}
            disabled={isUploading}
            className="sr-only"
            id={`upload-${label}`}
          />
          <Label
            htmlFor={`upload-${label}`}
            className="flex items-center justify-center w-32 h-32 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
          >
            {isUploading ? (
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            ) : (
              <Upload className="h-8 w-8 text-muted-foreground" />
            )}
          </Label>
        </div>
      )}
      
      <p className="text-xs text-muted-foreground">
        Supports: JPG, PNG, GIF (max 10MB)
      </p>
    </div>
  )
}