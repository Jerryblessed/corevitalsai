import { HealthSystem } from '../types/health';

export const HEALTH_SYSTEMS: HealthSystem[] = [
  {
    id: 'integumentary',
    name: 'Integumentary System',
    description: 'Skin, hair, and nails - your body\'s protective barrier',
    icon: '🛡️',
    status: 'good',
    lastChecked: new Date(),
    alerts: [],
    metrics: [
      { name: 'Skin Hydration', value: 75, unit: '%', trend: 'stable', optimal: { min: 70, max: 90 } },
      { name: 'UV Exposure', value: 3, unit: 'hours', trend: 'down', optimal: { min: 0, max: 2 } }
    ],
    videos: [
      {
        title: 'Understanding Your Skin: The Integumentary System',
        url: 'https://www.youtube.com/watch?v=6jQkxsXFts8',
        duration: '8:45',
        description: 'Learn about skin structure, function, and how to maintain healthy skin'
      },
      {
        title: 'Skin Care Routine for Busy Professionals',
        url: 'https://www.youtube.com/watch?v=voFZSHKdKTc',
        duration: '12:30',
        description: 'Quick and effective skincare tips for people with demanding schedules'
      },
      {
        title: 'Sun Protection and Skin Health',
        url: 'https://www.youtube.com/watch?v=o9BqrSAHbTc',
        duration: '6:15',
        description: 'Essential guide to protecting your skin from UV damage'
      }
    ]
  },
  {
    id: 'skeletal',
    name: 'Skeletal System',
    description: 'Bones and joints - structural foundation of your body',
    icon: '🦴',
    status: 'good',
    lastChecked: new Date(),
    alerts: [],
    metrics: [
      { name: 'Bone Density', value: 85, unit: '%', trend: 'stable', optimal: { min: 80, max: 100 } },
      { name: 'Joint Mobility', value: 90, unit: '%', trend: 'up', optimal: { min: 85, max: 100 } }
    ],
    videos: [
      {
        title: 'Bone Health: Building Strong Bones',
        url: 'https://www.youtube.com/watch?v=g9JBNiu8_-I',
        duration: '10:22',
        description: 'Understanding bone structure and how to maintain bone density'
      },
      {
        title: 'Joint Health and Mobility Exercises',
        url: 'https://www.youtube.com/watch?v=2HOCBaIcjBo',
        duration: '15:45',
        description: 'Simple exercises to maintain joint flexibility and prevent stiffness'
      },
      {
        title: 'Preventing Osteoporosis Through Lifestyle',
        url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        duration: '9:30',
        description: 'Nutrition and exercise strategies for long-term bone health'
      }
    ]
  },
  {
    id: 'muscular',
    name: 'Muscular System',
    description: 'Muscles and tendons - movement and strength',
    icon: '💪',
    status: 'excellent',
    lastChecked: new Date(),
    alerts: [],
    metrics: [
      { name: 'Muscle Mass', value: 78, unit: '%', trend: 'up', optimal: { min: 70, max: 90 } },
      { name: 'Flexibility', value: 82, unit: '%', trend: 'stable', optimal: { min: 75, max: 95 } }
    ],
    videos: [
      {
        title: 'Muscle Anatomy and Function',
        url: 'https://www.youtube.com/watch?v=VmcQfCcGScY',
        duration: '11:15',
        description: 'Complete guide to understanding how your muscles work'
      },
      {
        title: '10-Minute Desk Exercises for Office Workers',
        url: 'https://www.youtube.com/watch?v=RqcOCBb4arc',
        duration: '10:00',
        description: 'Quick muscle strengthening exercises you can do at work'
      },
      {
        title: 'Preventing Muscle Tension and Pain',
        url: 'https://www.youtube.com/watch?v=4BOTvaRaDjI',
        duration: '8:30',
        description: 'Techniques to reduce muscle tension from prolonged sitting'
      }
    ]
  },
  {
    id: 'nervous',
    name: 'Nervous System',
    description: 'Brain, spinal cord, and nerves - control center',
    icon: '🧠',
    status: 'good',
    lastChecked: new Date(),
    alerts: [
      { id: '1', type: 'info', message: 'Consider reducing screen time before bed', timestamp: new Date(), system: 'nervous' }
    ],
    metrics: [
      { name: 'Cognitive Function', value: 88, unit: '%', trend: 'stable', optimal: { min: 85, max: 100 } },
      { name: 'Stress Level', value: 45, unit: '%', trend: 'down', optimal: { min: 0, max: 30 } }
    ],
    videos: [
      {
        title: 'How Your Brain Works: Nervous System Explained',
        url: 'https://www.youtube.com/watch?v=qPix_X-9t7E',
        duration: '13:20',
        description: 'Understanding brain function and nervous system basics'
      },
      {
        title: 'Stress Management for Busy Professionals',
        url: 'https://www.youtube.com/watch?v=hnpQrMqDoqE',
        duration: '16:45',
        description: 'Evidence-based techniques to manage stress and improve mental health'
      },
      {
        title: 'Improving Sleep for Better Brain Health',
        url: 'https://www.youtube.com/watch?v=5MuIMqhT8DM',
        duration: '12:10',
        description: 'Sleep hygiene tips to optimize cognitive function'
      }
    ]
  },
  {
    id: 'endocrine',
    name: 'Endocrine System',
    description: 'Hormones and glands - chemical messengers',
    icon: '⚗️',
    status: 'fair',
    lastChecked: new Date(),
    alerts: [
      { id: '2', type: 'warning', message: 'Sleep pattern may affect hormone balance', timestamp: new Date(), system: 'endocrine' }
    ],
    metrics: [
      { name: 'Hormone Balance', value: 70, unit: '%', trend: 'stable', optimal: { min: 75, max: 95 } },
      { name: 'Metabolic Rate', value: 82, unit: '%', trend: 'up', optimal: { min: 80, max: 100 } }
    ],
    videos: [
      {
        title: 'Understanding Hormones and Your Health',
        url: 'https://www.youtube.com/watch?v=WVrlHH14q3o',
        duration: '14:30',
        description: 'How hormones affect your daily life and long-term health'
      },
      {
        title: 'Balancing Hormones Through Diet and Lifestyle',
        url: 'https://www.youtube.com/watch?v=yJigWOOdmRU',
        duration: '18:20',
        description: 'Natural ways to support healthy hormone production'
      },
      {
        title: 'Thyroid Health for Busy People',
        url: 'https://www.youtube.com/watch?v=1mK5XJye2qs',
        duration: '11:45',
        description: 'Understanding thyroid function and maintaining thyroid health'
      }
    ]
  },
  {
    id: 'cardiovascular',
    name: 'Cardiovascular System',
    description: 'Heart and blood vessels - circulation and oxygen delivery',
    icon: '❤️',
    status: 'good',
    lastChecked: new Date(),
    alerts: [],
    metrics: [
      { name: 'Heart Rate', value: 72, unit: 'bpm', trend: 'stable', optimal: { min: 60, max: 80 } },
      { name: 'Blood Pressure', value: 118, unit: 'mmHg', trend: 'stable', optimal: { min: 110, max: 120 } }
    ],
    videos: [
      {
        title: 'Heart Health: How Your Cardiovascular System Works',
        url: 'https://www.youtube.com/watch?v=CWFyxn0qDEU',
        duration: '9:45',
        description: 'Understanding your heart and blood circulation system'
      },
      {
        title: 'Cardio Exercises for Busy Schedules',
        url: 'https://www.youtube.com/watch?v=ml6cT4AZdqI',
        duration: '12:00',
        description: 'Effective cardiovascular workouts that fit into any schedule'
      },
      {
        title: 'Heart-Healthy Diet Tips',
        url: 'https://www.youtube.com/watch?v=TLpbfOJ4bJU',
        duration: '15:30',
        description: 'Nutrition strategies to support cardiovascular health'
      }
    ]
  },
  {
    id: 'lymphatic',
    name: 'Lymphatic System',
    description: 'Immune defense and fluid balance',
    icon: '🛡️',
    status: 'good',
    lastChecked: new Date(),
    alerts: [],
    metrics: [
      { name: 'Immune Function', value: 85, unit: '%', trend: 'stable', optimal: { min: 80, max: 95 } },
      { name: 'Lymph Flow', value: 90, unit: '%', trend: 'up', optimal: { min: 85, max: 100 } }
    ],
    videos: [
      {
        title: 'Your Immune System: Lymphatic System Explained',
        url: 'https://www.youtube.com/watch?v=GIJK3dwCWCw',
        duration: '10:15',
        description: 'How your lymphatic system protects you from illness'
      },
      {
        title: 'Boosting Immunity Through Lifestyle',
        url: 'https://www.youtube.com/watch?v=Erp8IAUouus',
        duration: '13:40',
        description: 'Natural ways to strengthen your immune system'
      },
      {
        title: 'Lymphatic Drainage and Detox',
        url: 'https://www.youtube.com/watch?v=QlZKsQkBP7w',
        duration: '8:25',
        description: 'Simple techniques to support lymphatic drainage'
      }
    ]
  },
  {
    id: 'respiratory',
    name: 'Respiratory System',
    description: 'Lungs and airways - oxygen exchange',
    icon: '🫁',
    status: 'excellent',
    lastChecked: new Date(),
    alerts: [],
    metrics: [
      { name: 'Lung Capacity', value: 92, unit: '%', trend: 'stable', optimal: { min: 85, max: 100 } },
      { name: 'Oxygen Saturation', value: 98, unit: '%', trend: 'stable', optimal: { min: 95, max: 100 } }
    ],
    videos: [
      {
        title: 'How Your Lungs Work: Respiratory System',
        url: 'https://www.youtube.com/watch?v=mykrnTh1tz8',
        duration: '11:30',
        description: 'Understanding breathing and lung function'
      },
      {
        title: 'Breathing Exercises for Stress Relief',
        url: 'https://www.youtube.com/watch?v=tybOi4hjZFQ',
        duration: '7:20',
        description: 'Simple breathing techniques to reduce stress and improve focus'
      },
      {
        title: 'Improving Lung Health and Capacity',
        url: 'https://www.youtube.com/watch?v=4Prc1UfuokY',
        duration: '14:15',
        description: 'Exercises and lifestyle tips for better respiratory health'
      }
    ]
  },
  {
    id: 'digestive',
    name: 'Digestive System',
    description: 'Stomach, intestines - nutrient processing',
    icon: '🍎',
    status: 'fair',
    lastChecked: new Date(),
    alerts: [
      { id: '3', type: 'info', message: 'Consider probiotics for gut health', timestamp: new Date(), system: 'digestive' }
    ],
    metrics: [
      { name: 'Digestive Health', value: 75, unit: '%', trend: 'up', optimal: { min: 80, max: 95 } },
      { name: 'Nutrient Absorption', value: 82, unit: '%', trend: 'stable', optimal: { min: 85, max: 100 } }
    ],
    videos: [
      {
        title: 'Your Digestive System: How It Works',
        url: 'https://www.youtube.com/watch?v=Og5xAdC8EUI',
        duration: '12:45',
        description: 'Understanding digestion from mouth to intestines'
      },
      {
        title: 'Gut Health for Busy Professionals',
        url: 'https://www.youtube.com/watch?v=B7IAcUwPBQc',
        duration: '16:20',
        description: 'Maintaining digestive health with a hectic schedule'
      },
      {
        title: 'Probiotics and Digestive Wellness',
        url: 'https://www.youtube.com/watch?v=eQtmQlQqUIw',
        duration: '9:50',
        description: 'The role of beneficial bacteria in digestive health'
      }
    ]
  },
  {
    id: 'urinary',
    name: 'Urinary System',
    description: 'Kidneys and bladder - waste filtration',
    icon: '💧',
    status: 'good',
    lastChecked: new Date(),
    alerts: [],
    metrics: [
      { name: 'Kidney Function', value: 88, unit: '%', trend: 'stable', optimal: { min: 85, max: 100 } },
      { name: 'Hydration Level', value: 80, unit: '%', trend: 'up', optimal: { min: 75, max: 90 } }
    ],
    videos: [
      {
        title: 'Kidney Function and Urinary System Health',
        url: 'https://www.youtube.com/watch?v=l128cMaIx2I',
        duration: '10:35',
        description: 'How your kidneys filter waste and maintain fluid balance'
      },
      {
        title: 'Hydration: How Much Water Do You Really Need?',
        url: 'https://www.youtube.com/watch?v=9iMGFqMmUFs',
        duration: '8:15',
        description: 'Understanding proper hydration for optimal kidney function'
      },
      {
        title: 'Preventing Kidney Stones and UTIs',
        url: 'https://www.youtube.com/watch?v=YMj4DGlHZac',
        duration: '13:25',
        description: 'Lifestyle tips to prevent common urinary system problems'
      }
    ]
  },
  {
    id: 'reproductive',
    name: 'Reproductive System',
    description: 'Reproductive organs and hormones',
    icon: '🌸',
    status: 'good',
    lastChecked: new Date(),
    alerts: [],
    metrics: [
      { name: 'Hormonal Balance', value: 85, unit: '%', trend: 'stable', optimal: { min: 80, max: 95 } },
      { name: 'Reproductive Health', value: 90, unit: '%', trend: 'stable', optimal: { min: 85, max: 100 } }
    ],
    videos: [
      {
        title: 'Reproductive Health Basics',
        url: 'https://www.youtube.com/watch?v=RjF_xfUll0I',
        duration: '14:20',
        description: 'Understanding reproductive system health for all ages'
      },
      {
        title: 'Hormonal Health and Fertility',
        url: 'https://www.youtube.com/watch?v=szADvoTwmEo',
        duration: '17:30',
        description: 'How lifestyle affects reproductive hormones and fertility'
      },
      {
        title: 'Reproductive Health Through Life Stages',
        url: 'https://www.youtube.com/watch?v=fM2qpBZ3nVw',
        duration: '12:40',
        description: 'Maintaining reproductive health at different life stages'
      }
    ]
  }
];

export const getSystemById = (id: string): HealthSystem | undefined => {
  return HEALTH_SYSTEMS.find(system => system.id === id);
};

export const getSystemsByStatus = (status: HealthSystem['status']): HealthSystem[] => {
  return HEALTH_SYSTEMS.filter(system => system.status === status);
};

export const getAllAlerts = () => {
  return HEALTH_SYSTEMS.flatMap(system => system.alerts);
};