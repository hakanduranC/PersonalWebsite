import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all content for a specific section
export const getBySection = query({
  args: { 
    section: v.union(
      v.literal("education"),
      v.literal("experience"), 
      v.literal("projects"),
      v.literal("skills"),
      v.literal("certifications"),
      v.literal("publications")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("content")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .filter((q) => q.eq(q.field("published"), true))
      .collect();
  },
});

// Query to get all content for admin (including unpublished)
export const getAllBySection = query({
  args: { 
    section: v.union(
      v.literal("education"),
      v.literal("experience"), 
      v.literal("projects"),
      v.literal("skills"),
      v.literal("certifications"),
      v.literal("publications")
    )
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("content")
      .withIndex("by_section", (q) => q.eq("section", args.section))
      .collect();
  },
});

// Create new content item
export const create = mutation({
  args: {
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
    content: v.string(),
    tags: v.optional(v.array(v.string())),
    metadata: v.optional(v.object({
      logoUrl: v.optional(v.string()),
      location: v.optional(v.string()),
      link: v.optional(v.string()),
      githubUrl: v.optional(v.string()),
      featured: v.optional(v.boolean()),
    })),
    order: v.number(),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    // TODO: Add auth check when Convex supports Clerk integration
    // For now, the middleware protects the admin routes
    return await ctx.db.insert("content", args);
  },
});

// Update existing content item
export const update = mutation({
  args: {
    id: v.id("content"),
    title: v.string(),
    subtitle: v.optional(v.string()),
    period: v.optional(v.string()),
    content: v.string(),
    tags: v.optional(v.array(v.string())),
    metadata: v.optional(v.object({
      logoUrl: v.optional(v.string()),
      location: v.optional(v.string()),
      link: v.optional(v.string()),
      githubUrl: v.optional(v.string()),
      featured: v.optional(v.boolean()),
    })),
    order: v.number(),
    published: v.boolean(),
  },
  handler: async (ctx, args) => {
    const { id, ...data } = args;
    await ctx.db.patch(id, data);
    return id;
  },
});

// Delete content item
export const remove = mutation({
  args: { id: v.id("content") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

// Update order of multiple items
export const updateOrder = mutation({
  args: {
    updates: v.array(v.object({
      id: v.id("content"),
      order: v.number()
    }))
  },
  handler: async (ctx, args) => {
    for (const update of args.updates) {
      await ctx.db.patch(update.id, { order: update.order });
    }
  },
});

// Get featured projects
export const getFeaturedProjects = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("content")
      .withIndex("by_section", (q) => q.eq("section", "projects"))
      .filter((q) => 
        q.and(
          q.eq(q.field("published"), true),
          q.eq(q.field("metadata.featured"), true)
        )
      )
      .take(3);
  },
});