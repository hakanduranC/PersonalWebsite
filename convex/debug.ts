import { query } from "./_generated/server";

export const checkContent = query({
  args: {},
  handler: async (ctx) => {
    const allContent = await ctx.db.query("content").collect();
    const profile = await ctx.db.query("profile").first();
    
    return {
      contentCount: allContent.length,
      contentBySection: {
        education: allContent.filter(c => c.section === "education").length,
        experience: allContent.filter(c => c.section === "experience").length,
        projects: allContent.filter(c => c.section === "projects").length,
        skills: allContent.filter(c => c.section === "skills").length,
      },
      profileExists: !!profile,
      sampleContent: allContent.slice(0, 3)
    };
  },
});