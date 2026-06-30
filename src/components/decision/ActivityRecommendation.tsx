import { Activity, AlertTriangle } from 'lucide-react';

interface ActivityRecommendationProps {
  activities: string[];
  warnings: string[];
}

export default function ActivityRecommendation({ activities, warnings }: ActivityRecommendationProps) {
  return (
    <div className="space-y-4">
      {/* Recommended Activities */}
      <div className="bg-green-50/50 border border-green-100 rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Activity className="w-5 h-5 text-green-600" />
          <h4 className="font-semibold text-gray-800">Recommended Activities</h4>
        </div>
        <div className="flex flex-wrap gap-2">
          {activities.map((activity, i) => (
            <span
              key={i}
              className="px-3 py-1.5 bg-white border border-green-100 rounded-full text-sm text-gray-700 shadow-sm"
            >
              ✓ {activity}
            </span>
          ))}
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="bg-amber-50/50 border border-amber-100 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h4 className="font-semibold text-gray-800">Warnings</h4>
          </div>
          <ul className="space-y-1">
            {warnings.map((warning, i) => (
              <li key={i} className="text-sm text-amber-700 flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">⚠</span>
                {warning}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}