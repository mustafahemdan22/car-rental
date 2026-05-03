import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getCarReviews = query({
  args: { carId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("reviews")
      .filter((q) => q.eq(q.field("carId"), args.carId))
      .collect();
  },
});

export const addReview = mutation({
  args: {
    carId: v.string(),
    userName: v.string(),
    rating: v.number(),
    comment: v.string(),
  },
  handler: async (ctx, args) => {
    // Insert new review
    await ctx.db.insert("reviews", {
      ...args,
      createdAt: new Date().toISOString(),
    });

    // Recalculate car average rating
    const carReviews = await ctx.db
      .query("reviews")
      .filter((q) => q.eq(q.field("carId"), args.carId))
      .collect();

    const sum = carReviews.reduce((acc, curr) => acc + curr.rating, 0);
    const avg = carReviews.length > 0 ? parseFloat((sum / carReviews.length).toFixed(1)) : args.rating;

    // Check if the car exists to patch its average rating
    const car = await ctx.db
      .query("cars")
      .filter((q) => q.eq(q.field("slug"), args.carId))
      .first();

    if (car) {
      await ctx.db.patch(car._id, { rating: avg });
    }
  },
});
