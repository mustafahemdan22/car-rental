import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const seedDatabase = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Clear existing data
    const cars = await ctx.db.query("cars").collect();
    for (const car of cars) {
      await ctx.db.delete(car._id);
    }
    const drivers = await ctx.db.query("drivers").collect();
    for (const driver of drivers) {
      await ctx.db.delete(driver._id);
    }

    // 2. Seed Cars
    const carsData = [
      {
        slug: "toyota-camry-2024",
        name_en: "Toyota Camry",
        name_ar: "تويوتا كامري",
        brand: "Toyota",
        category: "economy",
        type: "sedan",
        pricePerKm: 0.85,
        year: 2024,
        fuelType: "petrol",
        seats: 5,
        images: [
          "cars/toyota-camry-2024/cover",
          "cars/toyota-camry-2024/gallery-0",
          "cars/toyota-camry-2024/gallery-1",
          "cars/toyota-camry-2024/gallery-2"
        ],
        available: true,
        driverRequired: false,
        rating: 4.7,
        reviewCount: 234,
        color: "#C4B5A0",
        description_en: "A refined sedan combining comfort with fuel efficiency, perfect for city drives and highway cruising across the Kingdom.",
        description_ar: "سيدان أنيقة تجمع بين الراحة وكفاءة الوقود، مثالية للتنقل في المدينة والسفر على الطرق السريعة.",
        features: ["cruise-control", "bluetooth", "backup-camera", "apple-carplay"],
      },
      {
        slug: "nissan-patrol-2024",
        name_en: "Nissan Patrol",
        name_ar: "نيسان باترول",
        brand: "Nissan",
        category: "suv",
        type: "suv",
        pricePerKm: 1.65,
        year: 2024,
        fuelType: "petrol",
        seats: 8,
        images: [
          "cars/nissan-patrol-2024/cover",
          "cars/nissan-patrol-2024/gallery-0",
          "cars/nissan-patrol-2024/gallery-1",
          "cars/nissan-patrol-2024/gallery-2"
        ],
        available: true,
        driverRequired: false,
        rating: 4.9,
        reviewCount: 412,
        color: "#2C3E50",
        description_en: "The legendary SUV built for desert adventures and family road trips. Spacious, powerful, and dependable.",
        description_ar: "السيارة الأسطورية المصممة لمغامرات الصحراء ورحلات العائلة. واسعة وقوية ويمكن الاعتماد عليها.",
        features: ["4wd", "leather-seats", "sunroof", "navigation", "parking-sensors"],
      },
      {
        slug: "bmw-5-series-2024",
        name_en: "BMW 5 Series",
        name_ar: "بي إم دبليو الفئة الخامسة",
        brand: "BMW",
        category: "luxury",
        type: "luxury",
        pricePerKm: 2.20,
        year: 2024,
        fuelType: "petrol",
        seats: 5,
        images: [
          "cars/bmw-5-series-2024/cover",
          "cars/bmw-5-series-2024/gallery-0",
          "cars/bmw-5-series-2024/gallery-1",
          "cars/bmw-5-series-2024/gallery-2"
        ],
        available: true,
        driverRequired: true,
        rating: 4.8,
        reviewCount: 178,
        color: "#1A1A2E",
        description_en: "Executive luxury with dynamic performance. Premium comfort for business travelers who appreciate precision engineering.",
        description_ar: "فخامة تنفيذية مع أداء ديناميكي. راحة فائقة لرجال الأعمال الذين يقدرون الهندسة الدقيقة.",
        features: ["leather-seats", "heated-seats", "navigation", "premium-audio", "wireless-charging"],
      },
      {
        slug: "hyundai-accent-2024",
        name_en: "Hyundai Accent",
        name_ar: "هيونداي أكسنت",
        brand: "Hyundai",
        category: "economy",
        type: "economy",
        pricePerKm: 0.55,
        year: 2024,
        fuelType: "petrol",
        seats: 5,
        images: [
          "cars/hyundai-accent-2024/cover",
          "cars/hyundai-accent-2024/gallery-0",
          "cars/hyundai-accent-2024/gallery-1"
        ],
        available: true,
        driverRequired: false,
        rating: 4.3,
        reviewCount: 567,
        color: "#E8E8E8",
        description_en: "Smart, affordable, and easy to drive. The ideal choice for budget-conscious travelers exploring the city.",
        description_ar: "ذكية واقتصادية وسهلة القيادة. الخيار المثالي للمسافرين الباحثين عن توفير في التكاليف.",
        features: ["bluetooth", "backup-camera", "usb-ports"],
      },
      {
        slug: "lexus-es-350-2024",
        name_en: "Lexus ES 350",
        name_ar: "لكزس ES 350",
        brand: "Lexus",
        category: "luxury",
        type: "luxury",
        pricePerKm: 2.00,
        year: 2024,
        fuelType: "hybrid",
        seats: 5,
        images: [
          "cars/lexus-es-350-2024/cover",
          "cars/lexus-es-350-2024/gallery-0",
          "cars/lexus-es-350-2024/gallery-1"
        ],
        available: true,
        driverRequired: true,
        rating: 4.8,
        reviewCount: 145,
        color: "#F5F0EB",
        description_en: "Whisper-quiet luxury with hybrid efficiency. Crafted for those who demand elegance without compromise.",
        description_ar: "فخامة هادئة مع كفاءة الهجين. مصممة لمن يطلبون الأناقة بلا تنازل.",
        features: ["leather-seats", "mark-levinson-audio", "navigation", "adaptive-cruise", "panoramic-roof"],
      },
      {
        slug: "toyota-land-cruiser-2024",
        name_en: "Toyota Land Cruiser",
        name_ar: "تويوتا لاند كروزر",
        brand: "Toyota",
        category: "suv",
        type: "suv",
        pricePerKm: 1.90,
        year: 2024,
        fuelType: "petrol",
        seats: 7,
        images: [
          "cars/toyota-land-cruiser-2024/cover",
          "cars/toyota-land-cruiser-2024/gallery-0",
          "cars/toyota-land-cruiser-2024/gallery-1"
        ],
        available: true,
        driverRequired: false,
        rating: 4.9,
        reviewCount: 389,
        color: "#8B7355",
        description_en: "The king of off-road and on-road excellence. Unmatched capability for any terrain in the Kingdom.",
        description_ar: "ملك الطرق الوعرة والسلسة. قدرات لا ميل لها لجميع التضاريس في المملكة.",
        features: ["4wd", "leather-seats", "kdss", "multi-terrain-select", "crawl-control"],
      },
    ];

    const carIdsMap: Record<string, string> = {};
    for (const car of carsData) {
      const id = await ctx.db.insert("cars", car as any);
      carIdsMap[car.slug] = id;
    }

    // 3. Seed Drivers
    const driversData = [
      {
        name_en: "Ahmed Al-Mansoor",
        name_ar: "أحمد المنصور",
        age: 32,
        rating: 4.9,
        tripsCompleted: 450,
        yearsOfExperience: 6,
        image: "avatars/ahmed",
        availability: true,
        description_en: "Professional chauffeur with extensive knowledge of Cairo, Giza Pyramids, and historical landmarks.",
        description_ar: "سائق محترف على دراية تامة بالقاهرة وأهرامات الجيزة والمعالم التاريخية.",
        assignedCarId: carIdsMap["toyota-camry-2024"],
      },
      {
        name_en: "Fahad Al-Harbi",
        name_ar: "فهد الحربي",
        age: 28,
        rating: 4.8,
        tripsCompleted: 320,
        yearsOfExperience: 4,
        image: "avatars/fahad",
        availability: true,
        description_en: "Reliable and friendly, specializing in inter-city tourism tours to Alexandria and the Red Sea.",
        description_ar: "موظوق وودود، متخصص في الرحلات السياحية الطويلة بين الإسكندرية والبحر الأحمر.",
        assignedCarId: carIdsMap["nissan-patrol-2024"],
      },
      {
        name_en: "Saeed Al-Ghamdi",
        name_ar: "سعيد الغامدي",
        age: 35,
        rating: 4.9,
        tripsCompleted: 580,
        yearsOfExperience: 8,
        image: "avatars/saeed",
        availability: true,
        description_en: "Luxury tourism service specialist with impeccable driving habits in Upper Egypt (Luxor and Aswan). Speaks fluent Arabic and English.",
        description_ar: "أخصائي خدمة سياحية فاخرة، ذو أسلوب قيادة ممتاز في صعيد مصر (الأقصر وأسوان). يتحدث العربية والإنجليزية بطلاقة.",
        assignedCarId: carIdsMap["bmw-5-series-2024"],
      },
    ];

    for (const driver of driversData) {
      await ctx.db.insert("drivers", driver);
    }

    return "Database seeded with Cloudinary public IDs successfully!";
  },
});
