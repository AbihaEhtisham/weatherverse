import { Wind, Droplets, Eye, Gauge, Sun } from 'lucide-react';
import { formatWind, formatVisibility, formatUV, formatAQI } from '@/lib/formatters';

interface WeatherDetailsProps {
  humidity: number;
  windKph: number;
  windDir: string;
  visibilityKm: number;
  uv: number;
  pressureMb: number;
  aqi?: number;
}

export default function WeatherDetails({
  humidity,
  windKph,
  windDir,
  visibilityKm,
  uv,
  pressureMb,
  aqi,
}: WeatherDetailsProps) {
  const uvInfo = formatUV(uv);
  const aqiInfo = aqi ? formatAQI(aqi) : null;

  const details = [
    {
      icon: Droplets,
      label: 'Humidity',
      value: `${humidity}%`,
      sub: humidity > 70 ? 'High' : humidity < 30 ? 'Low' : 'Comfortable',
    },
    {
      icon: Wind,
      label: 'Wind',
      value: formatWind(windKph),
      sub: `${windDir || ''}`,
    },
    {
      icon: Eye,
      label: 'Visibility',
      value: `${visibilityKm} km`,
      sub: formatVisibility(visibilityKm),
    },
    {
      icon: Sun,
      label: 'UV Index',
      value: uv.toFixed(1),
      sub: uvInfo.label,
      subColor: uvInfo.color,
    },
    {
      icon: Gauge,
      label: 'Pressure',
      value: `${pressureMb} mb`,
      sub: pressureMb > 1020 ? 'High' : pressureMb < 1010 ? 'Low' : 'Normal',
    },
  ];

  if (aqiInfo) {
    details.push({
      icon: Wind,
      label: 'Air Quality',
      value: `AQI ${aqi}`,
      sub: aqiInfo.label,
      subColor: aqiInfo.color,
    });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
      {details.map((detail) => (
        <div
          key={detail.label}
          className="flex items-start gap-3 p-3 bg-white/60 rounded-xl border border-white/80"
        >
          <detail.icon className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs text-gray-500">{detail.label}</p>
            <p className="text-sm font-semibold text-gray-800">{detail.value}</p>
            {'subColor' in detail && detail.subColor ? (
              <p className={`text-xs ${detail.subColor}`}>{detail.sub}</p>
            ) : (
              <p className="text-xs text-gray-400">{detail.sub}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}