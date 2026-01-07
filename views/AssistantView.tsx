import React, { useState, useRef, useEffect } from 'react';
import { getAIStream } from '../services/geminiService';
import type { GenerateContentResponse } from '@google/genai';

interface Message {
  role: 'user' | 'model';
  text: string;
}

export const AssistantView: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    const history = messages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
    }));

    try {
        const stream = await getAIStream(history, input);
        let modelResponse = '';
        setMessages((prev) => [...prev, { role: 'model', text: '...' }]);

        for await (const chunk of stream) {
            modelResponse += chunk.text;
            setMessages((prev) => {
                const newMessages = [...prev];
                newMessages[newMessages.length - 1] = { role: 'model', text: modelResponse };
                return newMessages;
            });
        }
    } catch (error) {
        console.error("Error with AI stream:", error);
        setMessages((prev) => [...prev, { role: 'model', text: 'Sorry, I encountered an error.' }]);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="animate-fade-in flex flex-col h-full max-h-[calc(100vh-150px)] bg-brand-gray rounded-xl shadow-lg">
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-lg px-4 py-2 rounded-xl ${msg.role === 'user' ? 'bg-brand-green text-white' : 'bg-brand-gray-light text-gray-200'}`}>
                <p className="whitespace-pre-wrap">{msg.text}</p>
              </div>
            </div>
          ))}
           {loading && messages[messages.length - 1]?.role === 'user' && (
             <div className="flex justify-start">
               <div className="max-w-lg px-4 py-2 rounded-xl bg-brand-gray-light text-gray-200">
                 <p className="animate-pulse">...</p>
               </div>
             </div>
           )}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && !loading && handleSend()}
            placeholder="Ask 'diagnose my crop in sector B' or 'what schemes am I eligible for?'..."
            className="flex-1 w-full bg-brand-gray-dark border border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-brand-green focus:outline-none"
            disabled={loading}
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-brand-green text-white font-bold py-3 px-5 rounded-lg hover:bg-brand-green-dark transition disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
