import axios from 'axios';

// ElevenLabs API configuration
const ELEVENLABS_API_KEY = process.env.REACT_APP_ELEVENLABS_API_KEY || '';
const ELEVENLABS_BASE_URL = 'https://api.elevenlabs.io/v1';

// Default voice ID for a calming female voice (Aria - calm with a hint of rasp)
const DEFAULT_VOICE_ID = '9BWtsMINqrJLrRacOk9x'; // Aria voice

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  category: string;
  description: string;
  labels?: {
    gender?: string;
    descriptive?: string;
    age?: string;
    language?: string;
    use_case?: string;
  };
}

export interface ElevenLabsResponse {
  audio: string; // Base64 encoded audio
}

export const elevenLabsService = {
  // Get available voices
  async getVoices(): Promise<ElevenLabsVoice[]> {
    try {
      const response = await axios.get(`${ELEVENLABS_BASE_URL}/voices`, {
        headers: {
          'xi-api-key': ELEVENLABS_API_KEY,
        },
      });
      return response.data.voices;
    } catch (error) {
      console.error('Error fetching ElevenLabs voices:', error);
      return [];
    }
  },

  // Convert text to speech
  async textToSpeech(text: string, voiceId: string = DEFAULT_VOICE_ID): Promise<string | null> {
    if (!ELEVENLABS_API_KEY) {
      console.warn('ElevenLabs API key not found. Please set REACT_APP_ELEVENLABS_API_KEY environment variable.');
      return null;
    }

    try {
      const response = await axios.post(
        `${ELEVENLABS_BASE_URL}/text-to-speech/${voiceId}`,
        {
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5, // Balanced stability
            similarity_boost: 0.75, // Good voice consistency
            style: 0.0, // No style boost for meditation
            use_speaker_boost: true, // Enhance voice clarity
          },
        },
        {
          headers: {
            'xi-api-key': ELEVENLABS_API_KEY,
            'Content-Type': 'application/json',
          },
          responseType: 'arraybuffer',
        }
      );

      // Convert array buffer to base64
      const base64Audio = btoa(
        new Uint8Array(response.data).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          ''
        )
      );

      return `data:audio/mpeg;base64,${base64Audio}`;
    } catch (error) {
      console.error('Error with ElevenLabs TTS:', error);
      return null;
    }
  },

  // Play audio from base64 string
  playAudio(audioData: string): void {
    const audio = new Audio(audioData);
    audio.volume = 1.0;
    audio.play().catch(error => {
      console.error('Error playing audio:', error);
    });
  },

  // Speak text using ElevenLabs
  async speakText(text: string, volume: number = 1, voiceId?: string): Promise<void> {
    try {
      const audioData = await this.textToSpeech(text, voiceId);
      if (audioData) {
        const audio = new Audio(audioData);
        audio.volume = volume;
        await audio.play();
      } else {
        // Fallback to browser speech synthesis if ElevenLabs fails
        this.fallbackToBrowserSpeech(text, volume);
      }
    } catch (error) {
      console.error('Error with ElevenLabs speech:', error);
      // Fallback to browser speech synthesis
      this.fallbackToBrowserSpeech(text, volume);
    }
  },

  // Fallback to browser speech synthesis
  fallbackToBrowserSpeech(text: string, volume: number = 1): void {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.volume = volume;
      utterance.rate = 0.6;
      utterance.pitch = 0.8;
      utterance.lang = 'en-US';
      
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice = voices.find(voice => 
        voice.name.includes('Samantha') || 
        voice.name.includes('Victoria') ||
        voice.name.includes('Karen')
      );
      
      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }
      
      window.speechSynthesis.speak(utterance);
    }
  },

  // Get meditation-appropriate voices
  async getMeditationVoices(): Promise<ElevenLabsVoice[]> {
    try {
      console.log('Fetching voices from ElevenLabs...');
      const voices = await this.getVoices();
      console.log('All voices received:', voices.length);
      
      // Filter for premade voices that are suitable for meditation
      const meditationVoices = voices.filter(voice => 
        voice.category === 'premade' && 
        (voice.labels?.gender === 'female' || 
         voice.labels?.descriptive?.includes('calm') ||
         voice.labels?.descriptive?.includes('gentle') ||
         voice.labels?.descriptive?.includes('warm') ||
         voice.labels?.descriptive?.includes('professional') ||
         voice.name.toLowerCase().includes('sarah') ||
         voice.name.toLowerCase().includes('rachel') ||
         voice.name.toLowerCase().includes('laura') ||
         voice.name.toLowerCase().includes('aria') ||
         voice.name.toLowerCase().includes('jessica') ||
         voice.name.toLowerCase().includes('alice') ||
         voice.name.toLowerCase().includes('matilda') ||
         voice.name.toLowerCase().includes('lily'))
      );
      
      // If we don't have enough filtered voices, include more premade voices
      if (meditationVoices.length < 5) {
        const additionalVoices = voices.filter(voice => 
          voice.category === 'premade' && 
          !meditationVoices.some(mv => mv.voice_id === voice.voice_id)
        ).slice(0, 10);
        meditationVoices.push(...additionalVoices);
      }
      
      // Final fallback: if still no voices, return all premade voices
      if (meditationVoices.length === 0) {
        console.log('No filtered voices found, returning all premade voices');
        return voices.filter(voice => voice.category === 'premade').slice(0, 15);
      }
      
      console.log('Filtered meditation voices:', meditationVoices.length);
      console.log('Available voices:', meditationVoices.map(v => v.name));
      
      return meditationVoices;
    } catch (error) {
      console.error('Error getting meditation voices:', error);
      return [];
    }
  }
};

// Preload common meditation phrases for better performance
export const preloadMeditationAudio = async (): Promise<void> => {
  const commonPhrases = [
    "Welcome to your meditation",
    "Breathe in through your nose",
    "Breathe out through your mouth",
    "Take ten breaths",
    "Focus on your breath",
    "You're doing beautifully",
    "Continue breathing mindfully",
    "Thank you"
  ];

  // Preload these phrases in the background
  commonPhrases.forEach(async (phrase) => {
    try {
      await elevenLabsService.textToSpeech(phrase);
    } catch (error) {
      // Silently fail for preloading
    }
  });
};
