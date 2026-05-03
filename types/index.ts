export type Locale = 'en' | 'ar';
export type Direction = 'ltr' | 'rtl';
export type Theme = 'light' | 'dark';

export interface LocalizedString {
  en: string;
  ar: string;
}

/* ── Images (Cloudinary-ready) ──────────────────── */

export type UploadStatus = 'idle' | 'uploading' | 'success' | 'error';

export interface CloudinaryImage {
  publicId: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  format?: string;
}

export interface CarImage extends CloudinaryImage {
  assetFolder: string;
}

/* ── Driver ─────────────────────────────────────── */

export interface Driver {
  id: string;
  name: LocalizedString;
  avatarImage: CloudinaryImage;
  rating: number;
  tripsCompleted: number;
  yearsOfExperience: number;
  description: LocalizedString;
  assignedCarId?: string;
}

/* ── Car ────────────────────────────────────────── */

export type CarType = 'sedan' | 'suv' | 'sports' | 'luxury' | 'economy' | 'van';
export type FuelType = 'petrol' | 'diesel' | 'electric' | 'hybrid';

export interface Car {
  id: string;
  slug: string;
  name: LocalizedString;
  brand: string;
  year: number;
  type: CarType;
  pricePerKm: number;
  seats: number;
  fuelType: FuelType;
  coverImage: CarImage;
  gallery: CarImage[];
  description: LocalizedString;
  features: string[];
  inStock: boolean;
  rating: number;
  reviewCount: number;
  color: string;
}

/* ── Location ───────────────────────────────────── */

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Location {
  id: string;
  name: LocalizedString;
  address: LocalizedString;
  coordinates: Coordinates;
  city: LocalizedString;
  region?: LocalizedString;
  category?: LocalizedString;
}

/* ── Booking ────────────────────────────────────── */

export type BookingStep = 'select-car' | 'set-route' | 'review' | 'checkout' | 'confirmed';

export interface BookingState {
  selectedCar: Car | null;
  selectedDriver: Driver | null;
  pickupLocation: Location | null;
  destinationLocation: Location | null;
  pickupCoordinates: Coordinates | null;
  destinationCoordinates: Coordinates | null;
  distanceInKm: number;
  totalPrice: number;
  bookingStep: BookingStep;
  isCalculating: boolean;
  calculationError: string | null;
  pickupDate: Date | null;
  returnDate: Date | null;
}

export interface BookingActions {
  selectCar: (car: Car | null) => void;
  selectDriver: (driver: Driver | null) => void;
  setPickup: (location: Location) => void;
  setDestination: (location: Location) => void;
  calculatePrice: () => Promise<void>;
  setPickupDate: (date: Date | null) => void;
  setReturnDate: (date: Date | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  reset: () => void;
}

/* ── Forms ──────────────────────────────────────── */

export interface CheckoutFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  idNumber: string;
  notes: string;
}

export interface AddCarFormData {
  carName: string;
  brand: string;
  year: number;
  type: CarType;
  seats: number;
  fuelType: FuelType;
  pricePerKm: number;
  description: string;
  ownerName: string;
  ownerPhone: string;
  ownerEmail: string;
  city: string;
  coverImage: CloudinaryImage | null;
  galleryImages: CloudinaryImage[];
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

/* ── Filters ────────────────────────────────────── */

export interface FilterState {
  types: CarType[];
  fuelType: FuelType | null;
  minPrice: number;
  maxPrice: number;
  minSeats: number;
  year: number | null;
}

export type SortOption =
  | 'price-asc'
  | 'price-desc'
  | 'name-asc'
  | 'name-desc'
  | 'seats-desc'
  | 'rating-desc';

/* ── Messages ───────────────────────────────────── */

export interface Messages {
  [key: string]: string | Messages;
}
