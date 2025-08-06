"use client"

import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { Id } from "@/convex/_generated/dataModel"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface ConvexImageProps {
  src?: string
  alt: string
  className?: string
  fill?: boolean
  width?: number
  height?: number
  priority?: boolean
}

export function ConvexImage({ 
  src, 
  alt, 
  className,
  fill,
  width,
  height,
  priority
}: ConvexImageProps) {
  // Check if this is a Convex storage URL
  const isStorageUrl = src?.startsWith("storage:")
  const storageId = isStorageUrl ? src.replace("storage:", "") as Id<"_storage"> : null
  
  const imageUrl = useQuery(
    api.files.getUrl, 
    storageId ? { storageId } : "skip"
  )

  // Use the resolved URL if it's a storage URL, otherwise use the src directly
  const finalUrl = isStorageUrl ? imageUrl : src

  if (!finalUrl) {
    return (
      <div className={cn("bg-muted animate-pulse", className)} />
    )
  }

  if (fill) {
    return (
      <Image
        src={finalUrl}
        alt={alt}
        fill
        className={className}
        priority={priority}
      />
    )
  }

  return (
    <Image
      src={finalUrl}
      alt={alt}
      width={width || 100}
      height={height || 100}
      className={className}
      priority={priority}
    />
  )
}