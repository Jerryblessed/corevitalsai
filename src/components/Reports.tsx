import React, { useState } from 'react';
import { Download, Calendar, TrendingUp, FileText, Share2, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Reports: React.FC = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30d');
  const [selectedSystems, setSelectedSystems] = useState<string[]>(['all']);

  // Mock data for charts
  const healthTrends = [
    { date: '2024-01-01', overall: 85, energy: 78, mood: 82, sleep: 75 },
    { date: '2024-01-07', overall: 87, energy: 80, mood: 85, sleep: 78 },
    { date: '2024-01-14', overall: 82, energy: 75, mood: 80, sleep: 72 },
    { date: '2024-01-21', overall: 89, energy: 85, mood: 88, sleep: 82 },
    { date: '2024-01-28', overall: 91, energy: 88, mood: 90, sleep: 85 }
  ];

  const systemScores = [
    { system: 'Cardiovascular', score: 92, change: +5 },
    { system: 'Respiratory', score: 88, change: +2 },
    { system: 'Nervous', score: 85, change: -1 },
    { system: 'Muscular', score: 90, change: +8 },
    { system: 'Digestive', score: 78, change: +3 },
    { system: 'Endocrine', score: 82, change: -2 }
  ];

  const generateReport = () => {
    // This would generate and download a comprehensive health report
    console.log('Generating health report...');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Health Reports & Analytics</h1>
            <p className="text-lg text-gray-600">
              Comprehensive analysis of your health trends and progress across all systems
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-3">
            <button
              onClick={generateReport}
              className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Export Report</span>
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4" />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <div className="flex space-x-2">
              {['7d', '30d', '90d', '1y'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-3 py-1 rounded-lg text-sm transition-colors ${
                    selectedPeriod === period
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {period === '7d' ? '7 Days' : 
                   period === '30d' ? '30 Days' :
                   period === '90d' ? '3 Months' : '1 Year'}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-500" />
            <span className="text-sm text-gray-600">
              Last updated: {new Date().toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm text-green-600 font-medium">+12%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">87.5</h3>
          <p className="text-sm text-gray-600">Overall Health Score</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">✅</span>
            </div>
            <span className="text-sm text-blue-600 font-medium">28 days</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">23</h3>
          <p className="text-sm text-gray-600">Check-ins Completed</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">⚠️</span>
            </div>
            <span className="text-sm text-yellow-600 font-medium">-50%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">3</h3>
          <p className="text-sm text-gray-600">Active Alerts</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <span className="text-lg">🎯</span>
            </div>
            <span className="text-sm text-purple-600 font-medium">+8%</span>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">9/11</h3>
          <p className="text-sm text-gray-600">Systems Optimal</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Health Trends Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Trends Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#666"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis stroke="#666" fontSize={12} domain={[60, 100]} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e5e5', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Line type="monotone" dataKey="overall" stroke="#2563eb" strokeWidth={3} dot={{ fill: '#2563eb', r: 4 }} />
              <Line type="monotone" dataKey="energy" stroke="#16a34a" strokeWidth={2} dot={{ fill: '#16a34a', r: 3 }} />
              <Line type="monotone" dataKey="mood" stroke="#dc2626" strokeWidth={2} dot={{ fill: '#dc2626', r: 3 }} />
              <Line type="monotone" dataKey="sleep" stroke="#7c3aed" strokeWidth={2} dot={{ fill: '#7c3aed', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
          <div className="flex items-center justify-center space-x-6 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span>Overall</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-600 rounded-full"></div>
              <span>Energy</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-600 rounded-full"></div>
              <span>Mood</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-purple-600 rounded-full"></div>
              <span>Sleep</span>
            </div>
          </div>
        </div>

        {/* System Scores Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">System Performance Scores</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={systemScores} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis type="number" domain={[0, 100]} stroke="#666" fontSize={12} />
              <YAxis dataKey="system" type="category" stroke="#666" fontSize={12} width={100} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #e5e5e5', 
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Bar dataKey="score" fill="#2563eb" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed System Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">System Analysis Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemScores.map((system, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{system.system}</h3>
                <div className={`flex items-center space-x-1 text-sm ${
                  system.change > 0 ? 'text-green-600' : system.change < 0 ? 'text-red-600' : 'text-gray-600'
                }`}>
                  <span>{system.change > 0 ? '+' : ''}{system.change}</span>
                  {system.change > 0 ? <TrendingUp className="w-3 h-3" /> : 
                   system.change < 0 ? <TrendingUp className="w-3 h-3 rotate-180" /> : null}
                </div>
              </div>
              
              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Score</span>
                  <span className="font-medium">{system.score}/100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      system.score >= 90 ? 'bg-green-500' :
                      system.score >= 75 ? 'bg-blue-500' :
                      system.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${system.score}%` }}
                  />
                </div>
              </div>
              
              <p className="text-xs text-gray-600">
                {system.score >= 90 ? 'Excellent performance' :
                 system.score >= 75 ? 'Good performance' :
                 system.score >= 60 ? 'Needs attention' : 'Requires immediate care'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;