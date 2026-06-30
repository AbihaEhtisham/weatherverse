import { Shirt } from 'lucide-react';

interface ClothingRecommendationProps {
  items: string[];
}

export default function ClothingRecommendation({ items }: ClothingRecommendationProps) {
  return (
    <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <Shirt className="w-5 h-5 text-blue-600" />
        <h4 className="font-semibold text-gray-800">What to Wear</h4>
      </div>
      <div className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <span
            key={i}
            className="px-3 py-1.5 bg-white border border-blue-100 rounded-full text-sm text-gray-700 shadow-sm"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}