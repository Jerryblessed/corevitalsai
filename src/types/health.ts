export interface HealthSystem {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'excellent' | 'good' | 'fair' | 'poor' | 'critical';
  lastChecked: Date;
  alerts: HealthAlert[];
  metrics: HealthMetric[];
  videos: HealthVideo[];
}

export interface HealthAlert {
  id: string;
  type: 'info' | 'warning' | 'error';
  message: string;
  timestamp: Date;
  system: string;
}

export interface HealthMetric {
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  optimal: { min: number; max: number };
}

export interface HealthVideo {
  title: string;
  url: string;
  duration: string;
  description: string;
}

export interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: Date;
  type?: 'text' | 'voice' | 'image';
}

export interface DailyCheckIn {
  id: string;
  date: Date;
  symptoms: string[];
  moodScore: number;
  energyLevel: number;
  sleepHours: number;
  stressLevel: number;
  notes: string;
  aiAnalysis?: string;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  occupation: string;
  workSchedule: 'day' | 'night' | 'rotating';
  medicalConditions: string[];
  medications: string[];
  emergencyContact: {
    name: string;
    phone: string;
  };
}