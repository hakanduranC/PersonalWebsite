import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  profile: defineTable({
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    avatarUrl: v.optional(v.string()),
    backgroundUrl: v.optional(v.string()),
    email: v.string(),
    phone: v.string(),
    linkedin: v.string(),
    github: v.string(),
  }),
  
  // Universal content table for all sections
  content: defineTable({
    section: v.union(
      v.literal("education"),
      v.literal("experience"), 
      v.literal("projects"),
      v.literal("skills"),
      v.literal("certifications"),
      v.literal("publications")
    ),
    title: v.string(),
    subtitle: v.optional(v.string()),
    period: v.optional(v.string()),
    content: v.string(), // Markdown content
    tags: v.optional(v.array(v.string())), // For technologies, skills, etc.
    metadata: v.optional(v.object({
      logoUrl: v.optional(v.string()),
      location: v.optional(v.string()),
      link: v.optional(v.string()),
      githubUrl: v.optional(v.string()),
      featured: v.optional(v.boolean()),
    })),
    order: v.number(),
    published: v.boolean(),
  }).index("by_section", ["section", "order"]),
  
  // Settings for section configuration
  sections: defineTable({
    name: v.string(),
    slug: v.string(),
    enabled: v.boolean(),
    order: v.number(),
    title: v.string(),
    description: v.optional(v.string()),
  }),
});