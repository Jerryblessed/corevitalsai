# CoreVitals AI - Smart Health Diagnostic Platform

CoreVitals AI is a cutting-edge health application built to help busy individuals monitor and improve their health without the need for physical wearables. It uses AI-powered symptom analysis, daily check-ins, health system monitoring, and voice/video accessibility to provide early detection and personalized lifestyle recommendations.

> **Note:** This application is in **testing mode only**. Do not use in production environments.

---

## ⚙️ Installation Guide

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd corevitals-ai
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

### 4. Access the App

Visit: [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔍 Key Features

* ✅ **Symptom Analysis** covering all 11 major human body systems
* 🎙 **Voice-enabled AI Chatbot** (GPT-4o + Eleven Labs)
* 📆 **Daily Check-ins** with intelligent suggestions
* 📊 **Health Dashboard** with risk alerts & progress tracking
* 📹 **Educational Videos** by health system (YouTube integration)
* 🧬 **Histopathology Imaging Module** (with model-ready interface)
* 📈 **Lifestyle Suggestions** via notification engine
* 🧑‍⚕️ **Tavus Video Consults**: Personalized AI doctor responses

---

## 📁 Project Structure

```
corevitals-ai/
├── public/
│   └── health-icon.svg
├── src/
│   ├── types/
│   │   └── health.ts
│   ├── utils/
│   │   ├── api.ts
│   │   └── healthSystems.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Dashboard.tsx
│   │   ├── DailyCheckIn.tsx
│   │   ├── AIChat.tsx
│   │   ├── HealthSystems.tsx
│   │   ├── Reports.tsx
│   │   └── MedicalImaging.tsx
│   └── App.tsx
├── index.html
└── package.json
```

---

## 🔒 API Integrations

### Azure OpenAI

* GPT-4o deployed via Azure
* Handles all chatbot and quiz logic

### Eleven Labs TTS

* Converts diagnosis and recommendations to natural-sounding voice

### Tavus AI

* Provides personalized video responses from virtual doctors

### YouTube

* Educational videos integrated per body system

---

## 🌐 Live Deployment

> 🔗 [https://radiant-creponne-9d62bf.netlify.app](https://radiant-creponne-9d62bf.netlify.app)

To transfer Netlify project: [Claim this deployment](https://app.netlify.com/claim?utm_source=bolt#eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI1aDZmZEstVktNTXZuRjNiRlZUaktfU2JKVGgzNlNfMjJheTlpTHhVX0Q4Iiwic2Vzc2lvbl9pZCI6IjQ5NjM4NDQxOjc0OTUwNSIsImlhdCI6MTc0OTU3Njg0Mn0.a0UCPQXHaC2Gl2J-ngSG-iWi7QWsXsbz1ete-1CUSNI)

---

## 🧠 Powered By

* **GPT-4o** (via Azure OpenAI)
* **Eleven Labs** Voice AI
* **Tavus** Personalized Video API
* **YouTube** for Health Education

---

## 📝 License & Disclaimer

This app is not a replacement for professional medical advice. All content is for educational and testing purposes only.

---

## 👨‍💻 Author

Created by [@Jerryblessed](https://github.com/Jerryblessed) for the Bolt Hackathon Challenge
