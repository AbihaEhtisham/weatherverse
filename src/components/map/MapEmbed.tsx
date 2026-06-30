'use client';

import { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface MapEmbedProps {
  lat: number;
  lon: number;
  locationName: string;
}

export default function MapEmbed({ lat, lon, locationName }: MapEmbedProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="glass-card overflow-hidden">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-pm-blue" />
          <h3 className="font-semibold text-gray-800 text-sm">{locationName}</h3>
          <span className="text-xs text-gray-400 ml-auto">
            {lat.toFixed(4)}, {lon.toFixed(4)}
          </span>
        </div>
      </div>
      <div className="aspect-video w-full relative">
        {mounted ? (
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.1},${lat - 0.1},${lon + 0.1},${lat + 0.1}&layer=mapnik&marker=${lat},${lon}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            title={`Map of ${locationName}`}
            className="w-full h-full"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 animate-pulse flex items-center justify-center">
            <MapPin className="w-8 h-8 text-gray-300" />
          </div>
        )}
      </div>
      <div className="p-2 bg-gray-50 text-center">
        <a
          href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=12/${lat}/${lon}`}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-pm-blue hover:underline"
        >
          View larger map on OpenStreetMap ↗
        </a>
      </div>
    </div>
  );
}