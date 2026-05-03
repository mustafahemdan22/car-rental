import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getAvailableDrivers = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("drivers")
      .filter((q) => q.eq(q.field("availability"), true))
      .collect();
  },
});

export const assignDriverToBooking = mutation({
  args: { bookingId: v.id("bookings"), driverId: v.id("drivers") },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.bookingId, { driverId: args.driverId });
  },
});
