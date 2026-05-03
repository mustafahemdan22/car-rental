import { create } from 'zustand';
import type { Car, Driver, Location, Coordinates, BookingStep } from '@/types';
import { simulateRouteDistance, calculateTotalPrice } from '@/lib/mockDistance';

interface BookingStore {
  // State
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

  // Actions
  selectCar: (car: Car | null) => void;
  selectDriver: (driver: Driver | null) => void;
  setPickup: (location: Location) => void;
  setDestination: (location: Location) => void;
  calculatePrice: () => Promise<void>;
  setPickupDate: (date: Date | null) => void;
  setReturnDate: (date: Date | null) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: BookingStep) => void;
  reset: () => void;
}

const STEP_ORDER: BookingStep[] = ['select-car', 'set-route', 'review', 'checkout', 'confirmed'];

export const useBookingStore = create<BookingStore>((set, get) => ({
  // Initial state
  selectedCar: null,
  selectedDriver: null,
  pickupLocation: null,
  destinationLocation: null,
  pickupCoordinates: null,
  destinationCoordinates: null,
  distanceInKm: 0,
  totalPrice: 0,
  bookingStep: 'select-car',
  isCalculating: false,
  calculationError: null,
  pickupDate: null,
  returnDate: null,

  selectCar: (car) => {
    const state = get();
    set({ selectedCar: car });
    // Recalculate price if we have distance
    if (car && state.distanceInKm > 0) {
      set({ totalPrice: calculateTotalPrice(state.distanceInKm, car.pricePerKm) });
    } else {
      set({ totalPrice: 0 });
    }
  },

  selectDriver: (driver) => {
    set({ selectedDriver: driver });
  },

  setPickup: (location) => {
    set({
      pickupLocation: location,
      pickupCoordinates: location.coordinates,
      // Reset calculation when location changes
      distanceInKm: 0,
      totalPrice: 0,
      calculationError: null,
    });
  },

  setDestination: (location) => {
    set({
      destinationLocation: location,
      destinationCoordinates: location.coordinates,
      // Reset calculation when location changes
      distanceInKm: 0,
      totalPrice: 0,
      calculationError: null,
    });
  },

  calculatePrice: async () => {
    const state = get();
    if (!state.pickupCoordinates || !state.destinationCoordinates) {
      set({ calculationError: 'Missing pickup or destination' });
      return;
    }

    if (!state.selectedCar) {
      set({ calculationError: 'No car selected' });
      return;
    }

    set({ isCalculating: true, calculationError: null });

    try {
      const distance = await simulateRouteDistance(
        state.pickupCoordinates,
        state.destinationCoordinates
      );
      const total = calculateTotalPrice(distance, state.selectedCar.pricePerKm);

      set({
        distanceInKm: distance,
        totalPrice: total,
        isCalculating: false,
      });
    } catch {
      set({
        isCalculating: false,
        calculationError: 'Failed to calculate distance',
        distanceInKm: 0,
        totalPrice: 0,
      });
    }
  },

  setPickupDate: (date) => set({ pickupDate: date }),
  setReturnDate: (date) => set({ returnDate: date }),

  nextStep: () => {
    const currentIndex = STEP_ORDER.indexOf(get().bookingStep);
    if (currentIndex < STEP_ORDER.length - 1) {
      set({ bookingStep: STEP_ORDER[currentIndex + 1] });
    }
  },

  prevStep: () => {
    const currentIndex = STEP_ORDER.indexOf(get().bookingStep);
    if (currentIndex > 0) {
      set({ bookingStep: STEP_ORDER[currentIndex - 1] });
    }
  },

  goToStep: (step) => set({ bookingStep: step }),

  reset: () =>
    set({
      selectedCar: null,
      selectedDriver: null,
      pickupLocation: null,
      destinationLocation: null,
      pickupCoordinates: null,
      destinationCoordinates: null,
      distanceInKm: 0,
      totalPrice: 0,
      bookingStep: 'select-car',
      isCalculating: false,
      calculationError: null,
      pickupDate: null,
      returnDate: null,
    }),
}));
