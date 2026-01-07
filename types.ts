export type View = 'Dashboard' | 'Disease Doctor' | 'Crop Advisor' | 'Market Trends' | 'AI Assistant' | 'Supply Chain' | 'Farm Twin' | 'Sustainability' | 'Learning Hub';

export interface WeatherData {
  city: string;
  temperature: number;
  humidity: number;
  rainfall: number;
  description: string;
}

export interface MarketData {
  month: string;
  price: number;
}
