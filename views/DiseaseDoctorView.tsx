
import React, { useState } from 'react';
import { runDiseaseAnalysis } from '../services/geminiService';

export const DiseaseDoctorView: React.FC = () => {
    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [result, setResult] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) { // 2MB limit
                setError('File size should not exceed 2MB.');
                return;
            }
            setError('');
            setImage(file);
            setPreview(URL.createObjectURL(file));
            setResult('');
        }
    };

    const handleAnalyze = async () => {
        if (!image) {
            setError('Please upload an image first.');
            return;
        }
        setLoading(true);
        setError('');
        setResult('');
        try {
            const analysisResult = await runDiseaseAnalysis(image);
            setResult(analysisResult);
        } catch (err) {
            setError('An error occurred during analysis. Please try again.');
        } finally {
            setLoading(false);
        }
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
                <h2 className="text-2xl font-bold text-white mb-4">Upload Crop Image</h2>
                <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center bg-brand-gray-dark">
                    <input
                        type="file"
                        id="image-upload"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer text-brand-green font-semibold">
                        {image ? `${image.name}` : 'Choose a file'}
                    </label>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 2MB</p>
                    {preview && (
                        <div className="mt-4">
                            <img src={preview} alt="Crop preview" className="max-h-48 mx-auto rounded-lg" />
                        </div>
                    )}
                </div>
                {error && <p className="text-red-500 mt-2">{error}</p>}
                <button
                    onClick={handleAnalyze}
                    disabled={!image || loading}
                    className="mt-6 w-full bg-brand-green text-white font-bold py-3 px-4 rounded-lg hover:bg-brand-green-dark transition disabled:bg-gray-500 disabled:cursor-not-allowed flex items-center justify-center"
                >
                    {loading && <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>}
                    {loading ? 'Analyzing...' : 'Analyze for Diseases'}
                </button>
            </div>
            <div className="bg-brand-gray p-6 rounded-xl shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-4">AI Analysis Report</h2>
                <div className="bg-brand-gray-dark rounded-lg p-4 min-h-[300px] prose prose-invert prose-p:text-gray-300">
                    {loading ? (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-400">Generating report...</p>
                        </div>
                    ) : result ? (
                        renderMarkdown(result)
                    ) : (
                        <p className="text-gray-500">Your analysis report will appear here.</p>
                    )}
                </div>
            </div>
        </div>
    );
};
