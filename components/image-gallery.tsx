"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"

const initialImages = [
  {
    id: "1",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-02-13%20at%2021.23.54-fHB2j7kjOrbyL6I8acfQtt54bOmsQp.jpeg",
    alt: "Portrait 1",
  },
  {
    id: "2",
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/DSC00007.jpg-OoDPnQGuDmG7GSZQcdEpIlkSDhJAVX.jpeg",
    alt: "Portrait 2",
  },
  // Add more images as needed
]

export function ImageGallery() {
  const [images, setImages] = useState(initialImages)

  const onDragEnd = (result: any) => {
    if (!result.destination) return

    const items = Array.from(images)
    const [reorderedItem] = items.splice(result.source.index, 1)
    items.splice(result.destination.index, 0, reorderedItem)

    setImages(items)
  }

  return (
    <section className="py-16 bg-secondary/30" id="gallery">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-2 text-center mb-12"
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Gallery</h2>
          <p className="text-muted-foreground">Drag and drop to reorder images</p>
        </motion.div>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="gallery" direction="horizontal">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {images.map((image, index) => (
                  <Draggable key={image.id} draggableId={image.id} index={index}>
                    {(provided, snapshot) => (
                      <motion.div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`relative aspect-square rounded-lg overflow-hidden group ${
                          snapshot.isDragging ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <Image
                          src={image.src || "/placeholder.svg"}
                          alt={image.alt}
                          fill
                          className="object-cover transition-transform group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                          <p className="text-white text-sm">Drag to reorder</p>
                        </div>
                      </motion.div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </section>
  )
}

