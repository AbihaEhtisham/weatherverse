export interface ForecastDayScore {
  date: string;
  dayName: string;
  score: number;
  breakdown: {
    temperature: number;
    rain: number;
    wind: number;
    humidity: number;
    visibility: number;
  };
  isBestDay: boolean;
  verdict: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Bad';
}

export interface TripPlannerResult {
  days: ForecastDayScore[];
  bestDay: ForecastDayScore | null;
  summary: string;
}