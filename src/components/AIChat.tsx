import React, { useState, useRef, useEffect } from 'react';
import { Send, Mic, MicOff, Image, Play, Loader, Bot, User } from 'lucide-react';
import { sendChatMessage, generateTTSAudio } from '../utils/api';
import { Message } from '../types/health';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m your CoreVitals AI health assistant. I can help analyze your symptoms, provide health guidance across all 11 body systems, and answer any health-related questions. How can I assist you today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isGeneratingAudio, setIsGeneratingAudio] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const systemPrompt = `You are CoreVitals AI, an expert medical diagnostic assistant specializing in comprehensive health analysis across all 11 major body systems: Integumentary, Skeletal, Muscular, Nervous, Endocrine, Cardiovascular, Lymphatic, Respiratory, Digestive, Urinary, and Reproductive.

Your expertise includes:
- Symptom analysis and correlation across multiple body systems
- Personalized health recommendations for busy professionals
- Lifestyle modifications based on work schedules (day/night/rotating shifts)
- Preventive care guidance
- When to seek immediate medical attention

Always provide:
1. Clear, actionable advice
2. System-specific analysis when relevant
3. Risk assessment and urgency levels
4. Practical recommendations for busy lifestyles
5. Professional medical consultation recommendations when appropriate

Be thorough but concise, empathetic but professional, and always prioritize user safety.`;

      const response = await sendChatMessage(
        messages.concat(userMessage).map(msg => ({ role: msg.role, content: msg.content })),
        systemPrompt
      );

      const assistantMessage: Message = {
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Chat error:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'I apologize, but I encountered an error. Please try again or contact support if the issue persists.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerateAudio = async (text: string) => {
    setIsGeneratingAudio(true);
    try {
      const audioUrl = await generateTTSAudio(text);
      setAudioUrl(audioUrl);
      
      // Auto-play the audio
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    } catch (error) {
      console.error('TTS Error:', error);
    } finally {
      setIsGeneratingAudio(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceRecording = () => {
    // Voice recording functionality would be implemented here
    setIsRecording(!isRecording);
    // This would integrate with browser's speech recognition API
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 h-full flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Health Assistant</h1>
        <p className="text-lg text-gray-600">
          Chat with our advanced AI for personalized health insights and recommendations
        </p>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6 overflow-hidden flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-4 mb-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 ${
                message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gradient-to-br from-teal-500 to-blue-600 text-white'
              }`}>
                {message.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
              </div>
              
              <div className={`flex-1 max-w-3xl ${
                message.role === 'user' ? 'text-right' : 'text-left'
              }`}>
                <div className={`inline-block p-4 rounded-2xl ${
                  message.role === 'user'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <div className="whitespace-pre-wrap leading-relaxed">
                    {message.content}
                  </div>
                  
                  {message.role === 'assistant' && (
                    <div className="mt-3 pt-3 border-t border-gray-200 flex items-center space-x-2">
                      <button
                        onClick={() => handleGenerateAudio(message.content)}
                        disabled={isGeneratingAudio}
                        className="flex items-center space-x-1 text-xs text-gray-600 hover:text-gray-800 transition-colors"
                      >
                        {isGeneratingAudio ? (
                          <Loader className="w-3 h-3 animate-spin" />
                        ) : (
                          <Play className="w-3 h-3" />
                        )}
                        <span>Listen</span>
                      </button>
                    </div>
                  )}
                </div>
                
                {message.timestamp && (
                  <div className={`text-xs text-gray-500 mt-1 ${
                    message.role === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                )}
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="flex-1">
                <div className="inline-block p-4 bg-gray-100 rounded-2xl">
                  <div className="flex items-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin text-gray-600" />
                    <span className="text-gray-600">Analyzing your health query...</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-gray-200 pt-4">
          <div className="flex items-end space-x-3">
            <div className="flex-1">
              <textarea
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe your symptoms, ask health questions, or share concerns..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
            </div>
            
            <div className="flex flex-col space-y-2">
              <button
                onClick={handleVoiceRecording}
                className={`p-3 rounded-xl transition-colors ${
                  isRecording 
                    ? 'bg-red-600 text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
              </button>
              
              <button className="p-3 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-xl transition-colors">
                <Image className="w-5 h-5" />
              </button>
              
              <button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden audio element for TTS */}
      <audio ref={audioRef} className="hidden" controls />
    </div>
  );
};

export default AIChat;