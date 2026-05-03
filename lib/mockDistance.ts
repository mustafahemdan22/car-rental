import type { Coordinates } from '@/types';
import { delay } from './utils';

/**
 * Calculate straight-line distance between two coordinates using the Haversine formula.
 * Returns distance in kilometers.
 */
function haversineDistance(from: Coordinates, to: Coordinates): number {
  const R = 6371; // Earth's radius in km
  const dLat = toRad(to.lat - from.lat);
  const dLng = toRad(to.lng - from.lng);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(from.lat)) * Math.cos(toRad(to.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

/**
 * Simulate a route distance calculation.
 * Applies a 1.3x multiplier to straight-line distance to approximate road distance.
 * Returns distance in km, rounded to 1 decimal place.
 */
export async function simulateRouteDistance(
  from: Coordinates,
  to: Coordinates
): Promise<number> {
  // Simulate network delay (800-1500ms)
  await delay(800 + Math.random() * 700);

  const straightLine = haversineDistance(from, to);
  const roadMultiplier = 1.25 + Math.random() * 0.15; // 1.25-1.40x
  const roadDistance = straightLine * roadMultiplier;

  return Math.round(roadDistance * 10) / 10;
}

/**
 * Calculate total price from distance and price per km.
 */
export function calculateTotalPrice(distanceKm: number, pricePerKm: number): number {
  return Math.round(distanceKm * pricePerKm * 100) / 100;
}
