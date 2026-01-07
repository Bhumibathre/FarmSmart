
import React, { useState, useEffect } from 'react';
import type { WeatherData } from '../types';
import { SunIcon } from './IconComponents';

export const WeatherWidget: React.FC = () => {
    const [weather, setWeather] = useState<WeatherData | null>(null);

    useEffect(() => {
        // Mock data
        const mockWeatherData: WeatherData = {
            city: 'Green Valley',
            temperature: 28,
            humidity: 75,
            rainfall: 2.5,
            description: 'Partly Cloudy'
        };
        setWeather(mockWeatherData);
    }, []);

    if (!weather) {
        return <div className="bg-brand-gray p-6 rounded-xl shadow-lg text-white">Loading weather...</div>;
    }

    return (
        <div className="bg-brand-gray p-6 rounded-xl shadow-lg text-white">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-semibold">Current Weather</h3>
                    <p className="text-sm text-gray-400">{weather.city}</p>
                </div>
                <SunIcon className="h-10 w-10 text-yellow-400" />
            </div>
            <div className="mt-4 flex items-end justify-between">
                <div>
                    <p className="text-5xl font-bold">{weather.temperature}°C</p>
                    <p className="text-gray-300">{weather.description}</p>
                </div>
                <div className="text-right">
                    <p>Humidity: {weather.humidity}%</p>
                    <p>Rainfall: {weather.rainfall}mm</p>
                </div>
            </div>
        </div>
    );
};
