import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getUserBookings = query({
  args: { userName: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("bookings")
      .filter((q) => q.eq(q.field("userName"), args.userName))
      .collect();
  },
});

export const createBooking = mutation({
  args: {
    carId: v.string(),
    driverId: v.optional(v.string()),
    userName: v.string(),
    pickupLocation: v.string(),
    dropoffLocation: v.string(),
    distanceKm: v.number(),
    totalPrice: v.number(),
    status: v.string(),
    pickupDate: v.string(),
    returnDate: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("bookings", {
      ...args,
      createdAt: new Date().toISOString(),
    });
  },
});

export const confirmBooking = mutation({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "confirmed" });
  },
});

export const cancelBooking = mutation({
  args: { id: v.id("bookings") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.id, { status: "cancelled" });
  },
});
