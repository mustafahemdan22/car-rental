'use client';

import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { Coordinates } from '@/types';

interface MapPreviewProps {
  pickup?: Coordinates | null;
  destination?: Coordinates | null;
  className?: string;
}

// Fix Leaflet default icon issue
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const destinationIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export function MapPreview({ pickup, destination, className = '' }: MapPreviewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const lineRef = useRef<L.Polyline | null>(null);

  // Default center: Riyadh
  const defaultCenter: [number, number] = [24.7136, 46.6753];

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    const map = L.map(mapRef.current, {
      center: defaultCenter,
      zoom: 6,
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 18,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear existing markers and line
    markersRef.current.forEach((m) => m.remove());
    markersRef.current = [];
    if (lineRef.current) {
      lineRef.current.remove();
      lineRef.current = null;
    }

    const points: L.LatLng[] = [];

    if (pickup) {
      const marker = L.marker([pickup.lat, pickup.lng], { icon: defaultIcon }).addTo(map);
      markersRef.current.push(marker);
      points.push(L.latLng(pickup.lat, pickup.lng));
    }

    if (destination) {
      const marker = L.marker([destination.lat, destination.lng], { icon: destinationIcon }).addTo(map);
      markersRef.current.push(marker);
      points.push(L.latLng(destination.lat, destination.lng));
    }

    if (points.length === 2) {
      // Draw a curved line between points
      const line = L.polyline(points, {
        color: 'oklch(0.65 0.14 55)',
        weight: 3,
        opacity: 0.7,
        dashArray: '8, 8',
      }).addTo(map);
      lineRef.current = line;

      // Fit bounds to show both markers
      const bounds = L.latLngBounds(points);
      map.fitBounds(bounds, { padding: [50, 50] });
    } else if (points.length === 1) {
      map.setView(points[0], 12);
    }
  }, [pickup, destination]);

  return (
    <div
      ref={mapRef}
      className={`h-64 w-full overflow-hidden rounded-xl border border-warm-200 dark:border-warm-700 sm:h-80 ${className}`}
    />
  );
}
