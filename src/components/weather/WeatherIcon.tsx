import Image from 'next/image';

interface WeatherIconProps {
  iconUrl: string;
  condition: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 48,
  md: 64,
  lg: 96,
};

export default function WeatherIcon({ iconUrl, condition, size = 'md', className = '' }: WeatherIconProps) {
  return (
    <Image
      src={iconUrl}
      alt={condition}
      width={sizes[size]}
      height={sizes[size]}
      className={`drop-shadow-md ${className}`}
      priority={size === 'lg'}
    />
  );
}