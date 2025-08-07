import { VoiceGuidance, MeditationDuration } from '../types';

export const generateVoiceGuidance = (duration: MeditationDuration): VoiceGuidance[] => {
  const guidance: VoiceGuidance[] = [];

  // 0 minute - Opening guidance
  guidance.push({
    id: 'opening',
    text: "Welcome to your meditation. Find a comfortable position and close your eyes. Take a deep breath in through your nose, exhale slowly through your mouth. Feel your body settling into your seat. Now scan your body from head to toe, noticing any sensations. Simply observe without judgment.",
    timing: 0,
    tone: 'soothing'
  });

  // 2 minutes - Breathing guidance
  guidance.push({
    id: 'breathing_start',
    text: "Now focus on your breath. Breathe in through your nose, out through your mouth. Take ten breaths, then start again. If your mind wanders, gently return to your breath.",
    timing: 2 * 60,
    tone: 'calming'
  });

  // 5 minutes - Reminder
  guidance.push({
    id: 'reminder_1',
    text: "You're doing beautifully. Maintain focus on your breath. Feel the natural rhythm. Each breath is a new beginning. If thoughts arise, observe them like clouds passing by. Continue breathing mindfully.",
    timing: 5 * 60,
    tone: 'gentle'
  });

  // 8 minutes - Reminder (for 12+ minute sessions)
  if (duration >= 12) {
    guidance.push({
      id: 'reminder_2',
      text: "Your breath is your anchor. Feel the peace of being present. Each inhale brings fresh energy, each exhale releases what you no longer need. Continue with gentle awareness.",
      timing: 8 * 60,
      tone: 'soothing'
    });
  }

  // 11 minutes - Reminder (for 15+ minute sessions)
  if (duration >= 15) {
    guidance.push({
      id: 'reminder_3',
      text: "You're in a beautiful state of mindfulness. Notice how your body feels - lighter, more relaxed. This is the gift of meditation. Stay with this awareness.",
      timing: 11 * 60,
      tone: 'calming'
    });
  }

  // 14 minutes - Reminder (for 20 minute sessions)
  if (duration >= 20) {
    guidance.push({
      id: 'reminder_4',
      text: "Your mind has grown quieter, your body more relaxed. This is the natural state of meditation. Continue breathing mindfully.",
      timing: 14 * 60,
      tone: 'gentle'
    });
  }

  // 17 minutes - Reminder (for 20 minute sessions)
  if (duration >= 20) {
    guidance.push({
      id: 'reminder_5',
      text: "You've created a beautiful space of mindfulness. Feel the peace you've cultivated. This awareness is always available to you.",
      timing: 17 * 60,
      tone: 'soothing'
    });
  }

  // Last 30 seconds - Closing guidance
  const closingTime = duration * 60 - 30;
  guidance.push({
    id: 'closing',
    text: "As we end our meditation, finish your breath counting. Do one final body scan, noticing how you feel. Gradually become aware of the sounds around you. When ready, slowly open your eyes, bringing this mindful awareness with you. This peace is always within you. Thank you.",
    timing: closingTime,
    tone: 'gentle'
  });

  return guidance;
};

export const speakText = (text: string, volume: number = 1): void => {
  if ('speechSynthesis' in window) {
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.volume = volume;
    utterance.rate = 0.6; // Much slower for more calming effect
    utterance.pitch = 0.85; // Lower pitch for more soothing tone
    utterance.lang = 'en-US';
    
    // Get available voices and select the most suitable one
    const voices = window.speechSynthesis.getVoices();
    
    // Priority order for voice selection
    const preferredVoices = [
      'Samantha', // macOS default female voice
      'Victoria', // macOS alternative
      'Karen', // Windows female voice
      'Microsoft Zira', // Windows alternative
      'Google UK English Female', // Chrome female voice
      'Google US English Female', // Chrome alternative
    ];
    
    // Try to find a preferred voice
    let selectedVoice = null;
    for (const voiceName of preferredVoices) {
      const voice = voices.find(v => v.name.includes(voiceName));
      if (voice) {
        selectedVoice = voice;
        break;
      }
    }
    
    // If no preferred voice found, try to find any female voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => 
        voice.lang.includes('en') && 
        (voice.name.toLowerCase().includes('female') || 
         voice.name.toLowerCase().includes('samantha') ||
         voice.name.toLowerCase().includes('victoria') ||
         voice.name.toLowerCase().includes('karen'))
      );
    }
    
    // If still no voice found, use the first available English voice
    if (!selectedVoice) {
      selectedVoice = voices.find(voice => voice.lang.includes('en'));
    }
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    // Add natural pauses and breaks for more human-like speech
    const processedText = addNaturalPauses(text);
    utterance.text = processedText;

    window.speechSynthesis.speak(utterance);
  }
};

// Function to add natural pauses and breaks for more human-like speech
const addNaturalPauses = (text: string): string => {
  return text
    // Add pauses after sentences
    .replace(/\./g, '... ')
    .replace(/\!/g, '... ')
    .replace(/\?/g, '... ')
    // Add shorter pauses after commas
    .replace(/,/g, ', ')
    // Add pauses for emphasis on key phrases
    .replace(/(take a deep breath)/gi, '... take a deep breath... ')
    .replace(/(close your eyes)/gi, '... close your eyes... ')
    .replace(/(breathe in)/gi, '... breathe in... ')
    .replace(/(breathe out)/gi, '... breathe out... ')
    .replace(/(exhale)/gi, '... exhale... ')
    // Add emphasis on important words
    .replace(/(gently)/gi, '... gently... ')
    .replace(/(slowly)/gi, '... slowly... ')
    .replace(/(peacefully)/gi, '... peacefully... ')
    .replace(/(mindfully)/gi, '... mindfully... ')
    .replace(/(awareness)/gi, '... awareness... ')
    .replace(/(presence)/gi, '... presence... ')
    .replace(/(breathing)/gi, '... breathing... ')
    .replace(/(meditation)/gi, '... meditation... ')
    // Clean up multiple spaces
    .replace(/\s+/g, ' ')
    .trim();
};
