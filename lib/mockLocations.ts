import type { Location, Locale } from '@/types';
import { locations } from '@/data/locations';
import { delay } from './utils';

/**
 * Search locations by query string. Simulates async search with delay.
 * Matches against name, address, city, region, or category in the given locale.
 */
export async function searchLocations(query: string, locale: Locale): Promise<Location[]> {
  await delay(300 + Math.random() * 200);

  if (!query || query.length < 2) return [];

  const normalizedQuery = query.toLowerCase().trim();

  return locations.filter((loc) => {
    const name = loc.name[locale].toLowerCase();
    const address = loc.address[locale].toLowerCase();
    const city = loc.city[locale].toLowerCase();
    const region = loc.region ? loc.region[locale].toLowerCase() : '';
    const category = loc.category ? loc.category[locale].toLowerCase() : '';

    return (
      name.includes(normalizedQuery) ||
      address.includes(normalizedQuery) ||
      city.includes(normalizedQuery) ||
      region.includes(normalizedQuery) ||
      category.includes(normalizedQuery)
    );
  });
}

/**
 * Get all available locations.
 */
export function getAllLocations(): Location[] {
  return locations;
}

/**
 * Get a location by its ID.
 */
export function getLocationById(id: string): Location | undefined {
  return locations.find((loc) => loc.id === id);
}
