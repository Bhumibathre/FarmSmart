
import { GoogleGenAI, GenerateContentStreamResult } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const fileToGenerativePart = async (file: File) => {
  const base64EncodedDataPromise = new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result.split(',')[1]);
      }
    };
    reader.readAsDataURL(file);
  });
  return {
    inlineData: { data: await base64EncodedDataPromise, mimeType: file.type },
  };
};

export const runDiseaseAnalysis = async (imageFile: File): Promise<string> => {
    try {
        const imagePart = await fileToGenerativePart(imageFile);
        const prompt = "Analyze this image of a plant leaf. Identify any diseases, suggest potential causes, and recommend treatment options. Present the information clearly in markdown format.";

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: { parts: [imagePart, { text: prompt }] },
        });

        return response.text;
    } catch (error) {
        console.error("Error analyzing disease:", error);
        return "Sorry, I couldn't analyze the image. Please try again.";
    }
};

export const getCropRecommendation = async (soilData: { n: number, p: number, k: number, ph: number, temp: number, humidity: number, rainfall: number }): Promise<string> => {
    try {
        const prompt = `
        Given the following soil and weather conditions, recommend the best crop to plant.
        - Nitrogen (N): ${soilData.n} kg/ha
        - Phosphorus (P): ${soilData.p} kg/ha
        - Potassium (K): ${soilData.k} kg/ha
        - pH: ${soilData.ph}
        - Average Temperature: ${soilData.temp}°C
        - Average Humidity: ${soilData.humidity}%
        - Annual Rainfall: ${soilData.rainfall} mm

        Provide a primary crop recommendation with a short justification. Also, suggest one or two alternative crops. Finally, give a brief fertilizer recommendation for the primary crop. Format the response in markdown.
        `;
        
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });
        
        return response.text;
    } catch (error) {
        console.error("Error getting crop recommendation:", error);
        return "Sorry, I couldn't generate a recommendation. Please check the values and try again.";
    }
};


export const getAIStream = async (history: { role: string, parts: { text: string }[] }[], newMessage: string): Promise<GenerateContentStreamResult> => {
    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      history: history,
      config: {
        systemInstruction: "You are DIKSHA SmartAgri Assistant, a helpful AI for farmers. Provide concise, practical advice. You can understand English, Hindi, and Hinglish."
      }
    });

    return chat.sendMessageStream({ message: newMessage });
};
