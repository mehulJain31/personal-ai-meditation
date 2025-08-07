import { useState, useEffect, useCallback, useRef } from 'react';
import { MeditationSession, MeditationDuration, VoiceGuidance } from '../types';
import { generateVoiceGuidance, speakText } from '../utils/voiceGuidance';
import { generateEnhancedVoiceGuidance, speakTextEnhanced } from '../utils/enhancedVoiceGuidance';

export const useMeditationTimer = (duration: MeditationDuration, selectedVoiceId?: string) => {
  const [session, setSession] = useState<MeditationSession | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [remainingTime, setRemainingTime] = useState(duration * 60);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const voiceGuidanceRef = useRef<VoiceGuidance[]>([]);
  const lastGuidanceIndexRef = useRef<number>(-1);

  // Initialize voice guidance
  useEffect(() => {
    voiceGuidanceRef.current = generateEnhancedVoiceGuidance(duration);
  }, [duration]);

  // Timer logic
  useEffect(() => {
    if (isActive && remainingTime > 0) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          const newTime = prev - 1;
          
          // Check for voice guidance
          const currentTimeInSeconds = duration * 60 - newTime;
          const guidance = voiceGuidanceRef.current;
          
                     for (let i = 0; i < guidance.length; i++) {
             if (guidance[i].timing === currentTimeInSeconds && i > lastGuidanceIndexRef.current) {
               if (!isMuted) {
                 speakTextEnhanced(guidance[i].text, volume, selectedVoiceId).catch(error => {
                   console.error('Error speaking text:', error);
                 });
               }
               lastGuidanceIndexRef.current = i;
               break;
             }
           }
          
          return newTime;
        });
      }, 1000);
    } else if (remainingTime === 0) {
      setIsActive(false);
      if (session) {
        setSession(prev => prev ? { ...prev, isActive: false } : null);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, remainingTime, duration, volume, isMuted, session]);

  const startSession = useCallback(() => {
    const newSession: MeditationSession = {
      duration: duration * 60,
      isActive: true,
      startTime: Date.now(),
      remainingTime: duration * 60,
      currentPhase: {
        name: 'Opening',
        description: 'Beginning your meditation journey',
        startTime: 0,
        endTime: 2 * 60,
        voiceGuidance: 'Welcome to your meditation session...'
      }
    };
    
    setSession(newSession);
    setIsActive(true);
    setRemainingTime(duration * 60);
    lastGuidanceIndexRef.current = -1;
    
    // Start with opening guidance
    if (!isMuted) {
      const openingGuidance = voiceGuidanceRef.current.find(g => g.id === 'opening');
      if (openingGuidance) {
        speakTextEnhanced(openingGuidance.text, volume, selectedVoiceId).catch(error => {
          console.error('Error speaking opening guidance:', error);
        });
      }
    }
  }, [duration, volume, isMuted]);

  const pauseSession = useCallback(() => {
    setIsActive(false);
    if (session) {
      setSession(prev => prev ? { ...prev, isActive: false } : null);
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [session]);

  const stopSession = useCallback(() => {
    setIsActive(false);
    setSession(null);
    setRemainingTime(duration * 60);
    lastGuidanceIndexRef.current = -1;
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    // Cancel any ongoing speech
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  }, [duration]);

  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  const toggleMute = useCallback(() => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      // Muting - cancel speech
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    }
  }, [isMuted]);

  const updateVolume = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  return {
    session,
    isActive,
    remainingTime,
    volume,
    isMuted,
    startSession,
    pauseSession,
    stopSession,
    formatTime,
    toggleMute,
    updateVolume
  };
};
