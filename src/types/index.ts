export interface MeditationSession {
  duration: number;
  isActive: boolean;
  startTime: number | null;
  remainingTime: number;
  currentPhase: MeditationPhase;
}

export interface MeditationPhase {
  name: string;
  description: string;
  startTime: number;
  endTime: number;
  voiceGuidance: string;
}

export type MeditationDuration = 10 | 12 | 15 | 20;

export interface VoiceGuidance {
  id: string;
  text: string;
  timing: number;
  tone: 'soothing' | 'calming' | 'gentle';
}

export interface AppState {
  selectedDuration: MeditationDuration;
  isSessionActive: boolean;
  currentSession: MeditationSession | null;
  volume: number;
  isMuted: boolean;
}
