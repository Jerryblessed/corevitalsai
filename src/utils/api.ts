// API Configuration
const AZURE_OPENAI_BASE = "https://thisisoajo.openai.azure.com";
const AZURE_OPENAI_MODEL = "gpt-4o";
const AZURE_OPENAI_KEY = "9I4UEJweVUdih04Uv8AXcAxs5H8jSQRfwaugcSQYHcI882wSpFvqJQQJ99BAACL93NaXJ3w3AAABACOGkv4f";
const AZURE_OPENAI_VERSION = "2023-06-01-preview";

const ELEVEN_LABS_API_KEY = "sk_052ce1dd8e5f08520d62556b78c5bd55a2ce69188250bb88";
const TAVUS_API_KEY = "b49bcd1e5da149eba7659570ef64689e";
const TAVUS_REPLICA_ID = "rf6384076591";

export const sendChatMessage = async (messages: any[], systemPrompt: string) => {
  try {
    const response = await fetch(
      `${AZURE_OPENAI_BASE}/openai/deployments/${AZURE_OPENAI_MODEL}/chat/completions?api-version=${AZURE_OPENAI_VERSION}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-key': AZURE_OPENAI_KEY
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: systemPrompt },
            ...messages
          ],
          max_tokens: 1000,
          temperature: 0.7
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error('OpenAI API Error:', error);
    throw error;
  }
};

export const analyzeSymptoms = async (symptoms: string[], userContext: any) => {
  const systemPrompt = `You are CoreVitals AI, an expert medical diagnostic assistant. Analyze the provided symptoms and user context to evaluate which of the 11 major body systems may be affected: Integumentary, Skeletal, Muscular, Nervous, Endocrine, Cardiovascular, Lymphatic, Respiratory, Digestive, Urinary, Reproductive. 

Provide a detailed analysis including:
1. Most likely affected systems
2. Severity assessment (1-10 scale)
3. Recommended immediate actions
4. Lifestyle modifications
5. When to seek professional medical care

Be thorough but accessible for busy professionals. Focus on actionable insights.`;

  const userMessage = `
    Symptoms: ${symptoms.join(', ')}
    User Context: ${JSON.stringify(userContext)}
    
    Please analyze these symptoms across all 11 body systems and provide comprehensive health guidance.
  `;

  return await sendChatMessage([{ role: 'user', content: userMessage }], systemPrompt);
};

export const generateTTSAudio = async (text: string): Promise<string> => {
  try {
    const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM', {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVEN_LABS_API_KEY
      },
      body: JSON.stringify({
        text: text,
        model_id: "eleven_monolingual_v1",
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.5
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const audioBlob = await response.blob();
    return URL.createObjectURL(audioBlob);
  } catch (error) {
    console.error('Eleven Labs TTS Error:', error);
    throw error;
  }
};

export const generatePersonalizedVideo = async (message: string, patientName: string) => {
  try {
    const response = await fetch('https://tavusapi.com/v2/videos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': TAVUS_API_KEY
      },
      body: JSON.stringify({
        replica_id: TAVUS_REPLICA_ID,
        script: `Hello ${patientName}, ${message}`,
        background_url: "https://example.com/medical-office-background.jpg"
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.video_url;
  } catch (error) {
    console.error('Tavus API Error:', error);
    throw error;
  }
};

export const getTavusReplicas = async () => {
  try {
    const response = await fetch('https://tavusapi.com/v2/replicas', {
      method: 'GET',
      headers: {
        'x-api-key': TAVUS_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Tavus Replicas Error:', error);
    throw error;
  }
};