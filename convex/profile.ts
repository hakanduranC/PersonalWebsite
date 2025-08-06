import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {},
  handler: async (ctx) => {
    const profile = await ctx.db.query("profile").first();
    return profile;
  },
});

export const update = mutation({
  args: {
    name: v.string(),
    title: v.string(),
    bio: v.string(),
    avatarUrl: v.optional(v.string()),
    backgroundUrl: v.optional(v.string()),
    email: v.string(),
    phone: v.string(),
    linkedin: v.string(),
    github: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db.query("profile").first();
    
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    } else {
      return await ctx.db.insert("profile", args);
    }
  },
});