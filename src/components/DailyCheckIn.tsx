import React, { useState } from 'react';
import { Clock, Heart, Brain, Moon, Zap, MessageSquare, Send, Loader } from 'lucide-react';
import { analyzeSymptoms } from '../utils/api';

const DailyCheckIn: React.FC = () => {
  const [formData, setFormData] = useState({
    symptoms: [] as string[],
    moodScore: 5,
    energyLevel: 5,
    sleepHours: 8,
    stressLevel: 3,
    notes: ''
  });
  
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [currentSymptom, setCurrentSymptom] = useState('');

  const commonSymptoms = [
    'Headache', 'Fatigue', 'Nausea', 'Dizziness', 'Back pain',
    'Joint pain', 'Muscle aches', 'Difficulty sleeping', 'Anxiety',
    'Digestive issues', 'Shortness of breath', 'Chest tightness'
  ];

  const handleSymptomAdd = (symptom: string) => {
    if (symptom && !formData.symptoms.includes(symptom)) {
      setFormData(prev => ({
        ...prev,
        symptoms: [...prev.symptoms, symptom]
      }));
      setCurrentSymptom('');
    }
  };

  const handleSymptomRemove = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.filter(s => s !== symptom)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    try {
      const userContext = {
        checkInData: formData,
        timestamp: new Date().toISOString(),
        userType: 'busy_professional' // This would come from user profile
      };
      
      const analysis = await analyzeSymptoms(formData.symptoms, userContext);
      setAiAnalysis(analysis);
    } catch (error) {
      console.error('Error analyzing symptoms:', error);
      setAiAnalysis('Sorry, I encountered an error while analyzing your symptoms. Please try again later.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Daily Health Check-in</h1>
        <p className="text-lg text-gray-600">
          Take a moment to assess how you're feeling today. Our AI will analyze your inputs across all body systems.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Symptoms Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <MessageSquare className="w-5 h-5 text-blue-600 mr-2" />
            Symptoms & Concerns
          </h2>
          
          <div className="mb-4">
            <div className="flex space-x-2 mb-3">
              <input
                type="text"
                value={currentSymptom}
                onChange={(e) => setCurrentSymptom(e.target.value)}
                placeholder="Type a symptom or concern..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleSymptomAdd(currentSymptom))}
              />
              <button
                type="button"
                onClick={() => handleSymptomAdd(currentSymptom)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Add
              </button>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => handleSymptomAdd(symptom)}
                  className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  {symptom}
                </button>
              ))}
            </div>
            
            {formData.symptoms.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.symptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="flex items-center space-x-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full"
                  >
                    <span className="text-sm">{symptom}</span>
                    <button
                      type="button"
                      onClick={() => handleSymptomRemove(symptom)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Rating Scales */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Mood Score */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Heart className="w-5 h-5 text-red-500 mr-2" />
              Overall Mood
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Very Low</span>
                <span>Excellent</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.moodScore}
                onChange={(e) => setFormData(prev => ({ ...prev, moodScore: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-blue-600">{formData.moodScore}/10</span>
              </div>
            </div>
          </div>

          {/* Energy Level */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Zap className="w-5 h-5 text-yellow-500 mr-2" />
              Energy Level
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Exhausted</span>
                <span>Energetic</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.energyLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, energyLevel: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-yellow-600">{formData.energyLevel}/10</span>
              </div>
            </div>
          </div>

          {/* Sleep Hours */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Moon className="w-5 h-5 text-indigo-500 mr-2" />
              Sleep Last Night
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>2 hours</span>
                <span>12 hours</span>
              </div>
              <input
                type="range"
                min="2"
                max="12"
                value={formData.sleepHours}
                onChange={(e) => setFormData(prev => ({ ...prev, sleepHours: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-indigo-600">{formData.sleepHours} hours</span>
              </div>
            </div>
          </div>

          {/* Stress Level */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-5 h-5 text-purple-500 mr-2" />
              Stress Level
            </h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Relaxed</span>
                <span>High Stress</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.stressLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, stressLevel: parseInt(e.target.value) }))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="text-center">
                <span className="text-2xl font-bold text-purple-600">{formData.stressLevel}/10</span>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Notes */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            rows={4}
            placeholder="Any additional details about how you're feeling, activities, medications, or concerns..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isAnalyzing}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isAnalyzing ? (
              <>
                <Loader className="w-5 h-5 mr-2 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Submit Check-in
              </>
            )}
          </button>
        </div>
      </form>

      {/* AI Analysis Results */}
      {aiAnalysis && (
        <div className="mt-8 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl shadow-sm border border-blue-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <Brain className="w-5 h-5 text-blue-600 mr-2" />
            AI Health Analysis
          </h2>
          <div className="prose prose-blue max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {aiAnalysis}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyCheckIn;