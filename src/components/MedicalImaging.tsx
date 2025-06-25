import React, { useState, useRef } from 'react';
import { Upload, Camera, Brain, AlertTriangle, CheckCircle, Loader, FileImage, Download, Share2 } from 'lucide-react';

interface ClassificationResult {
  prediction: string;
  confidence: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  recommendations: string[];
  timestamp: Date;
}

const MedicalImaging: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<ClassificationResult | null>(null);
  const [analysisHistory, setAnalysisHistory] = useState<ClassificationResult[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const HIST_CLASSES = [
    'Colon Adenocarcinoma',
    'Colon Benign',
    'Lung Adenocarcinoma',
    'Lung Benign',
    'Lung Squamous Cell Carcinoma'
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const classifyImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    try {
      // Simulate model prediction (replace with actual model inference)
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock classification result
      const mockPredictions = [
        { class: 'Colon Benign', confidence: 0.92, risk: 'low' as const },
        { class: 'Lung Adenocarcinoma', confidence: 0.87, risk: 'critical' as const },
        { class: 'Colon Adenocarcinoma', confidence: 0.78, risk: 'high' as const },
        { class: 'Lung Benign', confidence: 0.95, risk: 'low' as const },
        { class: 'Lung Squamous Cell Carcinoma', confidence: 0.83, risk: 'critical' as const }
      ];
      
      const randomResult = mockPredictions[Math.floor(Math.random() * mockPredictions.length)];
      
      const recommendations = getRecommendations(randomResult.class, randomResult.risk);
      
      const classificationResult: ClassificationResult = {
        prediction: randomResult.class,
        confidence: randomResult.confidence,
        riskLevel: randomResult.risk,
        recommendations,
        timestamp: new Date()
      };

      setResult(classificationResult);
      setAnalysisHistory(prev => [classificationResult, ...prev.slice(0, 9)]);
      
    } catch (error) {
      console.error('Classification error:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getRecommendations = (prediction: string, riskLevel: string): string[] => {
    const baseRecommendations = {
      'Colon Adenocarcinoma': [
        'Immediate consultation with an oncologist required',
        'Schedule comprehensive staging workup',
        'Consider genetic counseling for family members',
        'Discuss treatment options including surgery and chemotherapy'
      ],
      'Colon Benign': [
        'Continue regular screening as recommended',
        'Maintain healthy diet rich in fiber',
        'Monitor for any changes in bowel habits',
        'Follow up with gastroenterologist as scheduled'
      ],
      'Lung Adenocarcinoma': [
        'Urgent referral to thoracic oncology team',
        'Complete staging with CT and PET scans',
        'Molecular testing for targeted therapy options',
        'Smoking cessation support if applicable'
      ],
      'Lung Benign': [
        'Regular follow-up imaging as recommended',
        'Avoid smoking and secondhand smoke exposure',
        'Monitor for respiratory symptoms',
        'Maintain good respiratory hygiene'
      ],
      'Lung Squamous Cell Carcinoma': [
        'Immediate thoracic surgery consultation',
        'Complete staging and biomarker testing',
        'Multidisciplinary team evaluation',
        'Consider clinical trial eligibility'
      ]
    };

    return baseRecommendations[prediction as keyof typeof baseRecommendations] || [
      'Consult with healthcare provider for interpretation',
      'Follow standard screening guidelines',
      'Maintain healthy lifestyle habits'
    ];
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      case 'moderate': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'high': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="w-5 h-5" />;
      case 'moderate': return <AlertTriangle className="w-5 h-5" />;
      case 'high': return <AlertTriangle className="w-5 h-5" />;
      case 'critical': return <AlertTriangle className="w-5 h-5" />;
      default: return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Medical Image Analysis</h1>
        <p className="text-lg text-gray-600">
          AI-powered histopathology analysis for colon and lung tissue classification
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <FileImage className="w-5 h-5 text-blue-600 mr-2" />
              Upload Medical Image
            </h2>
            
            <div className="space-y-4">
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-400 hover:bg-blue-50 transition-colors cursor-pointer"
              >
                {imagePreview ? (
                  <div className="space-y-4">
                    <img
                      src={imagePreview}
                      alt="Selected medical image"
                      className="max-w-full max-h-64 mx-auto rounded-lg shadow-sm"
                    />
                    <p className="text-sm text-gray-600">
                      {selectedImage?.name} ({(selectedImage?.size || 0 / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto" />
                    <div>
                      <p className="text-lg font-medium text-gray-900">Upload histopathology image</p>
                      <p className="text-sm text-gray-600">
                        Supports colon and lung tissue samples (PNG, JPG, JPEG)
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />

              <div className="flex space-x-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose File</span>
                </button>
                
                <button
                  onClick={classifyImage}
                  disabled={!selectedImage || isAnalyzing}
                  className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isAnalyzing ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <Brain className="w-4 h-4" />
                      <span>Analyze Image</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Model Information */}
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl shadow-sm border border-blue-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Brain className="w-5 h-5 text-blue-600 mr-2" />
              AI Model Information
            </h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="font-medium text-gray-900">Model:</span>
                <span className="ml-2 text-gray-700">DenseNet121 Histopathology Classifier</span>
              </div>
              <div>
                <span className="font-medium text-gray-900">Supported Classes:</span>
                <ul className="ml-2 mt-1 space-y-1">
                  {HIST_CLASSES.map((className, index) => (
                    <li key={index} className="text-gray-700">• {className}</li>
                  ))}
                </ul>
              </div>
              <div className="pt-2 border-t border-blue-200">
                <p className="text-xs text-blue-700">
                  <strong>Disclaimer:</strong> This AI tool is for educational and research purposes only. 
                  Always consult with qualified medical professionals for diagnosis and treatment decisions.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-6">
          {result && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Analysis Results</h2>
              
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border-2 ${getRiskColor(result.riskLevel)}`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      {getRiskIcon(result.riskLevel)}
                      <span className="font-semibold">Classification</span>
                    </div>
                    <span className="text-sm font-medium capitalize">{result.riskLevel} Risk</span>
                  </div>
                  <p className="text-lg font-bold mb-1">{result.prediction}</p>
                  <p className="text-sm">Confidence: {(result.confidence * 100).toFixed(1)}%</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Recommendations</h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex space-x-3">
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    <Share2 className="w-4 h-4" />
                    <span>Share Results</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Analysis History */}
          {analysisHistory.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Analysis History</h3>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {analysisHistory.map((analysis, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-sm">{analysis.prediction}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getRiskColor(analysis.riskLevel)}`}>
                        {analysis.riskLevel}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Confidence: {(analysis.confidence * 100).toFixed(1)}%</span>
                      <span>{analysis.timestamp.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Safety Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-yellow-800 mb-2">Important Medical Disclaimer</h4>
                <p className="text-sm text-yellow-700 leading-relaxed">
                  This AI analysis tool is designed for educational and research purposes only. 
                  It should not be used as a substitute for professional medical diagnosis, treatment, 
                  or advice. Always consult with qualified healthcare professionals for medical decisions. 
                  The accuracy of AI predictions may vary and should be validated through proper medical channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalImaging;