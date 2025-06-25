import React, { useState } from 'react';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ArrowRight, Play, Clock, ExternalLink } from 'lucide-react';
import { HEALTH_SYSTEMS } from '../utils/healthSystems';
import { HealthSystem } from '../types/health';

const HealthSystems: React.FC = () => {
  const [selectedSystem, setSelectedSystem] = useState<HealthSystem | null>(null);
  const [showVideos, setShowVideos] = useState(false);

  const getStatusColor = (status: HealthSystem['status']) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-50 border-green-200';
      case 'good': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'fair': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'poor': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: HealthSystem['status']) => {
    switch (status) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="w-5 h-5" />;
      case 'fair':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'poor':
      case 'critical':
        return <AlertTriangle className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const openVideo = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Body Systems Overview</h1>
        <p className="text-lg text-gray-600">
          Comprehensive monitoring of all 11 major body systems with AI-powered insights and educational videos
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Systems List */}
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {HEALTH_SYSTEMS.map((system) => (
              <div
                key={system.id}
                onClick={() => {
                  setSelectedSystem(system);
                  setShowVideos(false);
                }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${getStatusColor(
                  system.status
                )} ${selectedSystem?.id === system.id ? 'ring-2 ring-blue-500' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <span className="text-2xl">{system.icon}</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 text-lg">{system.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{system.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    {getStatusIcon(system.status)}
                    <ArrowRight className="w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium capitalize text-lg">{system.status}</span>
                  <span className="text-sm text-gray-500">
                    Last checked: {system.lastChecked.toLocaleDateString()}
                  </span>
                </div>

                {system.alerts.length > 0 && (
                  <div className="mb-4">
                    <div className="text-sm text-gray-600 mb-2">
                      {system.alerts.length} active alert{system.alerts.length > 1 ? 's' : ''}
                    </div>
                  </div>
                )}

                {/* Video Count Indicator */}
                <div className="mb-4 flex items-center space-x-2 text-sm text-blue-600">
                  <Play className="w-4 h-4" />
                  <span>{system.videos.length} educational videos available</span>
                </div>

                {system.metrics.length > 0 && (
                  <div className="space-y-2">
                    {system.metrics.slice(0, 2).map((metric, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">{metric.name}</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">
                            {metric.value}{metric.unit}
                          </span>
                          {getTrendIcon(metric.trend)}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Detailed View */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            {selectedSystem ? (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-teal-100 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">{selectedSystem.icon}</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">{selectedSystem.name}</h2>
                    <p className="text-sm text-gray-600">{selectedSystem.description}</p>
                  </div>
                </div>

                <div className={`p-4 rounded-lg mb-6 ${getStatusColor(selectedSystem.status)}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(selectedSystem.status)}
                      <span className="font-semibold capitalize text-lg">
                        {selectedSystem.status}
                      </span>
                    </div>
                    <span className="text-sm">
                      {selectedSystem.lastChecked.toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Video Section Toggle */}
                <div className="mb-6">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setShowVideos(false)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        !showVideos 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      Metrics & Alerts
                    </button>
                    <button
                      onClick={() => setShowVideos(true)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                        showVideos 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Play className="w-4 h-4" />
                      <span>Educational Videos</span>
                    </button>
                  </div>
                </div>

                {showVideos ? (
                  /* Video Section */
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Educational Videos</h3>
                    <div className="space-y-4">
                      {selectedSystem.videos.map((video, index) => (
                        <div
                          key={index}
                          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => openVideo(video.url)}
                        >
                          <div className="flex items-start space-x-3">
                            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Play className="w-6 h-6 text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium text-gray-900 mb-1 line-clamp-2">
                                {video.title}
                              </h4>
                              <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                                {video.description}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-1 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  <span>{video.duration}</span>
                                </div>
                                <ExternalLink className="w-4 h-4 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                      <div className="flex items-center space-x-2 text-blue-800 mb-2">
                        <Play className="w-4 h-4" />
                        <span className="font-medium text-sm">Video Learning Tips</span>
                      </div>
                      <p className="text-xs text-blue-700">
                        Click on any video to open it in a new tab. These educational resources are curated to help you understand and improve your {selectedSystem.name.toLowerCase()} health.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Metrics and Alerts Section */
                  <div>
                    {selectedSystem.alerts.length > 0 && (
                      <div className="mb-6">
                        <h3 className="font-semibold text-gray-900 mb-3">Active Alerts</h3>
                        <div className="space-y-2">
                          {selectedSystem.alerts.map((alert) => (
                            <div
                              key={alert.id}
                              className={`p-3 rounded-lg text-sm ${
                                alert.type === 'error' ? 'bg-red-50 text-red-800' :
                                alert.type === 'warning' ? 'bg-yellow-50 text-yellow-800' :
                                'bg-blue-50 text-blue-800'
                              }`}
                            >
                              {alert.message}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-4">Key Metrics</h3>
                      <div className="space-y-4">
                        {selectedSystem.metrics.map((metric, index) => (
                          <div key={index} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">{metric.name}</span>
                              {getTrendIcon(metric.trend)}
                            </div>
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-2xl font-bold text-gray-900">
                                {metric.value}{metric.unit}
                              </span>
                              <span className="text-sm text-gray-500">
                                Optimal: {metric.optimal.min}-{metric.optimal.max}{metric.unit}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  metric.value >= metric.optimal.min && metric.value <= metric.optimal.max
                                    ? 'bg-green-500'
                                    : metric.value < metric.optimal.min
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                                style={{
                                  width: `${Math.min(
                                    (metric.value / (metric.optimal.max * 1.2)) * 100,
                                    100
                                  )}%`
                                }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-2xl">🏥</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a System</h3>
                <p className="text-gray-600 mb-4">
                  Click on any body system to view detailed metrics, alerts, and educational videos.
                </p>
                <div className="flex items-center justify-center space-x-1 text-sm text-blue-600">
                  <Play className="w-4 h-4" />
                  <span>Each system includes curated video content</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HealthSystems;