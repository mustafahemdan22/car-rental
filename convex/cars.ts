import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAllCars = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("cars").collect();
  },
});

export const getCarById = query({
  args: { id: v.id("cars") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getCarBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cars")
      .filter((q) => q.eq(q.field("slug"), args.slug))
      .first();
  },
});

export const filterCarsByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("cars")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});

export const updateCarAvailability = mutation({
  args: { id: v.id("cars"), status: v.boolean() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { available: args.status });
  },
});
