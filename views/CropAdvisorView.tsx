
import React, { useState } from 'react';
import { getCropRecommendation } from '../services/geminiService';

const SliderInput = ({ label, value, setValue, min, max, unit }: { label: string, value: number, setValue: (val: number) => void, min: number, max: number, unit: string }) => (
    <div>
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        <div className="flex items-center space-x-4">
            <input
                type="range"
                min={min}
                max={max}
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-brand-green font-semibold w-24 text-right">{value} {unit}</span>
        </div>
    </div>
);

export const CropAdvisorView: React.FC = () => {
    const [n, setN] = useState(90);
    const [p, setP] = useState(42);
    const [k, setK] = useState(43);
    const [ph, setPh] = useState(6.5);
    const [temp, setTemp] = useState(25);
    const [humidity, setHumidity] = useState(80);
    const [rainfall, setRainfall] = useState(200);
    
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');

    const handleGetRecommendation = async () => {
        setLoading(true);
        setResult('');
        const recommendation = await getCropRecommendation({ n, p, k, ph, temp, humidity, rainfall });
        setResult(recommendation);
        setLoading(false);
    };
    
    // Simple markdown-to-html renderer
    const renderMarkdown = (text: string) => {
        const html = text
            .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
            .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3">$1</h2>')
            .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-extrabold mt-8 mb-4">$1</h1>')
            .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
            .replace(/\*(.*)\*/gim, '<em>$1</em>')
            .replace(/^- (.*$)/gim, '<li class="ml-6 list-disc">$1</li>')
            .replace(/\n/g, '<br />');
        return <div dangerouslySetInnerHTML={{ __html: html.replace(/<br \/><li/g, '<li') }} />;
    };

    return (
        <div className="animate-fade-in grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6">Enter Farm Conditions</h2>
                <div className="space-y-6">
                    <SliderInput label="Nitrogen (N)" value={n} setValue={setN} min={0} max={200} unit="kg/ha" />
                    <SliderInput label="Phosphorus (P)" value={p} setValue={setP} min={0} max={100} unit="kg/ha" />
                    <SliderInput label="Potassium (K)" value={k} setValue={setK} min={0} max={100} unit="kg/ha" />
                    <SliderInput label="Soil pH" value={ph} setValue={setPh} min={3} max={10} unit="" />
                    <SliderInput label="Temperature" value={temp} setValue={setTemp} min={0} max={50} unit="°C" />
                    <SliderInput label="Humidity" value={humidity} setValue={setHumidity} min={0} max={100} unit="%" />
                    <SliderInput label="Rainfall" value={rainfall} setValue={setRainfall} min={0} max={500} unit="mm" />
                </div>
                <button
                    onClick={handleGetRecommendation}
                    disabled={loading}
                    className="mt-8 w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-green-dark transition disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>}
                    {loading ? 'Generating...' : 'Get Recommendation'}
                </button>
            </div>
             <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">AI Recommendation</h2>
                 <div className="bg-brand-gray-dark rounded-lg p-4 min-h-[300px] prose prose-invert prose-p:text-gray-300">
                     {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400">Generating your personalized recommendation...</p>
                        </div>
                    ) : result ? (
                        renderMarkdown(result)
                    ) : (
                        <p className="text-gray-500">Your crop and fertilizer recommendations will appear here.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
