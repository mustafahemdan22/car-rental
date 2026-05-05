import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  cars: defineTable({
    slug: v.string(),
    name_en: v.string(),
    name_ar: v.string(),
    brand: v.string(),
    category: v.string(), // economy, suv, luxury, van
    type: v.string(), // sedan, suv, sports, luxury, economy, van
    pricePerKm: v.number(),
    year: v.number(),
    fuelType: v.string(),
    seats: v.number(),
    images: v.array(v.string()), // array of Cloudinary URLs
    available: v.boolean(),
    driverRequired: v.boolean(),
    rating: v.number(),
    reviewCount: v.number(),
    color: v.string(),
    description_en: v.string(),
    description_ar: v.string(),
    features: v.array(v.string()),
  }),
  drivers: defineTable({
    name_en: v.string(),
    name_ar: v.string(),
    age: v.number(),
    rating: v.number(),
    tripsCompleted: v.number(),
    yearsOfExperience: v.number(),
    image: v.string(), // Cloudinary URL
    availability: v.boolean(),
    assignedCarId: v.optional(v.string()),
    description_en: v.string(),
    description_ar: v.string(),
  }),
  bookings: defineTable({
    carId: v.string(),
    driverId: v.optional(v.string()),
    userName: v.string(),
    pickupLocation: v.string(),
    dropoffLocation: v.string(),
    distanceKm: v.number(),
    totalPrice: v.number(),
    status: v.string(), // pending | confirmed | completed | cancelled
    pickupDate: v.string(),
    returnDate: v.string(),
    createdAt: v.string(),
  }),
  reviews: defineTable({
    carId: v.string(),
    userName: v.string(),
    rating: v.number(), // 1 to 5
    comment: v.string(),
    createdAt: v.string(),
  }),
});
