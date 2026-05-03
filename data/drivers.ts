import type { Driver, CloudinaryImage } from '@/types';

function createMockAvatar(id: string, name: string): CloudinaryImage {
  return {
    publicId: `avatars/${id}`,
    url: `/api/placeholder/drivers/${id}`,
    alt: `${name} avatar`,
    width: 200,
    height: 200,
  };
}

export const drivers: Driver[] = [
  {
    id: 'drv-001',
    name: { en: 'Ahmed Al-Mansoor', ar: 'أحمد المنصور' },
    avatarImage: createMockAvatar('ahmed', 'Ahmed Al-Mansoor'),
    rating: 4.9,
    tripsCompleted: 450,
    yearsOfExperience: 6,
    description: {
      en: 'Professional chauffeur with extensive knowledge of Cairo, Giza Pyramids, and historical landmarks.',
      ar: 'سائق محترف على دراية تامة بالقاهرة وأهرامات الجيزة والمعالم التاريخية.',
    },
    assignedCarId: 'car-001',
  },
  {
    id: 'drv-002',
    name: { en: 'Fahad Al-Harbi', ar: 'فهد الحربي' },
    avatarImage: createMockAvatar('fahad', 'Fahad Al-Harbi'),
    rating: 4.8,
    tripsCompleted: 320,
    yearsOfExperience: 4,
    description: {
      en: 'Reliable and friendly, specializing in inter-city tourism tours to Alexandria and the Red Sea.',
      ar: 'موثوق وودود، متخصص في الرحلات السياحية الطويلة بين الإسكندرية والبحر الأحمر.',
    },
    assignedCarId: 'car-002',
  },
  {
    id: 'drv-003',
    name: { en: 'Saeed Al-Ghamdi', ar: 'سعيد الغامدي' },
    avatarImage: createMockAvatar('saeed', 'Saeed Al-Ghamdi'),
    rating: 4.9,
    tripsCompleted: 580,
    yearsOfExperience: 8,
    description: {
      en: 'Luxury tourism service specialist with impeccable driving habits in Upper Egypt (Luxor and Aswan). Speaks fluent Arabic and English.',
      ar: 'أخصائي خدمة سياحية فاخرة، ذو أسلوب قيادة ممتاز في صعيد مصر (الأقصر وأسوان). يتحدث العربية والإنجليزية بطلاقة.',
    },
    assignedCarId: 'car-003',
  },
  {
    id: 'drv-004',
    name: { en: 'Yousef Al-Qahtani', ar: 'يوسف القحطاني' },
    avatarImage: createMockAvatar('yousef', 'Yousef Al-Qahtani'),
    rating: 4.7,
    tripsCompleted: 290,
    yearsOfExperience: 3,
    description: {
      en: 'Very accommodating driver, keeps vehicles spotless. Ideal for visitors exploring beach destinations in Hurghada and Sharm El Sheikh.',
      ar: 'سائق متعاون جداً، يحافظ على نظافة السيارة تماماً. ممتاز للزوار الباحثين عن الوجهات الشاطئية في الغردقة وشرم الشيخ.',
    },
    assignedCarId: 'car-005',
  },
  {
    id: 'drv-005',
    name: { en: 'Majed Al-Otaibi', ar: 'ماجد العتيبي' },
    avatarImage: createMockAvatar('majed', 'Majed Al-Otaibi'),
    rating: 4.8,
    tripsCompleted: 410,
    yearsOfExperience: 5,
    description: {
      en: 'Expert in routes between Cairo and Alexandria. Courteous and trustworthy.',
      ar: 'خبير في الطرق السريعة بين القاهرة والإسكندرية. يتميز باللباقة والموثوقية.',
    },
    assignedCarId: 'car-006',
  },
  {
    id: 'drv-006',
    name: { en: 'Khalid Al-Shammari', ar: 'خالد الشمري' },
    avatarImage: createMockAvatar('khalid', 'Khalid Al-Shammari'),
    rating: 5.0,
    tripsCompleted: 620,
    yearsOfExperience: 10,
    description: {
      en: 'Top-rated driver for multi-day tourism tours with extreme punctuality. Professional tourist chauffeur.',
      ar: 'السائق الأعلى تقييماً للرحلات السياحية الطويلة، مع التزام تام بالمواعيد. سائق سياحي محترف.',
    },
    assignedCarId: 'car-008',
  },
];

export function getDriverById(id: string): Driver | undefined {
  return drivers.find((d) => d.id === id);
}
