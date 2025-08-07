import React, { useState, useEffect } from 'react';
import { useMeditationTimer } from '../hooks/useMeditationTimer';
import { MeditationDuration } from '../types';
import { speakTextEnhanced } from '../utils/enhancedVoiceGuidance';
import { elevenLabsService, ElevenLabsVoice } from '../utils/elevenLabsService';
import {
  AppContainer,
  Header,
  Title,
  Subtitle,
  DurationContainer,
  DurationButton,
  TimerContainer,
  TimerDisplay,
  TimerLabel,
  ControlsContainer,
  ControlButton,
  BreathingCircle,
  VolumeContainer,
  VolumeSlider,
  VolumeLabel,
  VoiceQualityContainer,
  VoiceQualityButton,
  VoiceSelector,
  StatusMessage,
  ProgressContainer,
  ProgressBar,
  PhaseContainer,
  PhaseName,
  PhaseDescription
} from './styled/AppStyles';

const MeditationApp: React.FC = () => {
  const [selectedDuration, setSelectedDuration] = useState<MeditationDuration>(10);
  const [currentPhase, setCurrentPhase] = useState<string>('Ready to begin');
  const [phaseDescription, setPhaseDescription] = useState<string>('Select a duration and start your meditation');
  const [voiceQuality, setVoiceQuality] = useState<'enhanced' | 'standard'>('enhanced');
  const [availableVoices, setAvailableVoices] = useState<ElevenLabsVoice[]>([]);
  const [selectedVoiceId, setSelectedVoiceId] = useState<string>('9BWtsMINqrJLrRacOk9x'); // Aria voice

  const {
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
  } = useMeditationTimer(selectedDuration, selectedVoiceId);

  // Update phase information based on timer
  useEffect(() => {
    if (!isActive) {
      setCurrentPhase('Ready to begin');
      setPhaseDescription('Select a duration and start your meditation');
      return;
    }

    const elapsedTime = selectedDuration * 60 - remainingTime;
    const elapsedMinutes = Math.floor(elapsedTime / 60);

    if (elapsedTime < 30) {
      setCurrentPhase('Opening');
      setPhaseDescription('Finding your comfortable position and beginning your journey');
    } else if (elapsedTime < 120) {
      setCurrentPhase('Body Scan');
      setPhaseDescription('Scanning your body from head to toe, noticing sensations');
    } else if (elapsedTime < 300) {
      setCurrentPhase('Breathing Focus');
      setPhaseDescription('Counting breaths and maintaining gentle focus');
    } else if (elapsedTime < 600) {
      setCurrentPhase('Deep Awareness');
      setPhaseDescription('Maintaining mindfulness and observing thoughts');
    } else if (elapsedTime < 900) {
      setCurrentPhase('Peaceful Presence');
      setPhaseDescription('Resting in awareness and cultivating inner peace');
    } else if (remainingTime <= 30) {
      setCurrentPhase('Closing');
      setPhaseDescription('Gently concluding your practice and returning to awareness');
    } else {
      setCurrentPhase('Mindful Meditation');
      setPhaseDescription('Continuing your practice with gentle awareness');
    }
  }, [isActive, remainingTime, selectedDuration]);

  const handleDurationSelect = (duration: MeditationDuration) => {
    if (!isActive) {
      setSelectedDuration(duration);
    }
  };

  const handleStart = () => {
    startSession();
  };

  const handlePause = () => {
    pauseSession();
  };

  const handleStop = () => {
    stopSession();
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateVolume(parseFloat(e.target.value));
  };

  // Load available voices on component mount
  useEffect(() => {
    const loadVoices = async () => {
      try {
        const voices = await elevenLabsService.getMeditationVoices();
        console.log('Loaded voices:', voices);
        setAvailableVoices(voices);
      } catch (error) {
        console.error('Error loading voices:', error);
      }
    };
    loadVoices();
  }, []);

  const progress = isActive ? ((selectedDuration * 60 - remainingTime) / (selectedDuration * 60)) * 100 : 0;

  return (
    <AppContainer>
      <Header>
        <Title>Meditation App</Title>
        <Subtitle>Find your inner peace with guided meditation</Subtitle>
      </Header>

      <DurationContainer>
        {([10, 12, 15, 20] as MeditationDuration[]).map((duration) => (
          <DurationButton
            key={duration}
            selected={selectedDuration === duration}
            onClick={() => handleDurationSelect(duration)}
            disabled={isActive}
          >
            {duration} min
          </DurationButton>
        ))}
      </DurationContainer>

      <TimerContainer>
        <TimerLabel>
          {isActive ? 'Remaining Time' : 'Session Duration'}
        </TimerLabel>
        <TimerDisplay>{formatTime(remainingTime)}</TimerDisplay>
        
        {isActive && (
          <ProgressContainer>
            <ProgressBar progress={progress} />
          </ProgressContainer>
        )}
      </TimerContainer>

      {isActive && (
        <BreathingCircle isActive={true} />
      )}

      <PhaseContainer>
        <PhaseName>{currentPhase}</PhaseName>
        <PhaseDescription>{phaseDescription}</PhaseDescription>
      </PhaseContainer>

      <ControlsContainer>
        {!isActive ? (
          <ControlButton variant="primary" onClick={handleStart}>
            Start Meditation
          </ControlButton>
        ) : (
          <>
            <ControlButton variant="secondary" onClick={handlePause}>
              Pause
            </ControlButton>
            <ControlButton variant="danger" onClick={handleStop}>
              Stop
            </ControlButton>
          </>
        )}
      </ControlsContainer>

      <VolumeContainer>
        <VolumeLabel>Volume:</VolumeLabel>
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
        />
        <ControlButton
          variant="secondary"
          onClick={toggleMute}
          style={{ padding: '0.5rem 1rem', minWidth: 'auto' }}
        >
          {isMuted ? '🔇' : '🔊'}
        </ControlButton>
      </VolumeContainer>

      <VoiceQualityContainer>
        <VolumeLabel>Voice:</VolumeLabel>
        <VoiceQualityButton
          selected={voiceQuality === 'enhanced'}
          onClick={() => setVoiceQuality('enhanced')}
          disabled={isActive}
        >
          Enhanced
        </VoiceQualityButton>
        <VoiceQualityButton
          selected={voiceQuality === 'standard'}
          onClick={() => setVoiceQuality('standard')}
          disabled={isActive}
        >
          Standard
        </VoiceQualityButton>
      </VoiceQualityContainer>

      {voiceQuality === 'enhanced' && (
        <VoiceQualityContainer>
          <VolumeLabel>Voice:</VolumeLabel>
          {availableVoices.length > 0 ? (
            <VoiceSelector
              value={selectedVoiceId}
              onChange={(e) => setSelectedVoiceId(e.target.value)}
              disabled={isActive}
            >
              {availableVoices.map((voice) => (
                <option key={voice.voice_id} value={voice.voice_id}>
                  {voice.name}
                </option>
              ))}
            </VoiceSelector>
          ) : (
            <div style={{ color: 'white', opacity: 0.7 }}>
              Loading voices...
            </div>
          )}
        </VoiceQualityContainer>
      )}

      <StatusMessage>
        {isActive 
          ? 'Focus on your breath and let the guidance support your practice'
          : 'Choose your preferred duration and begin your meditation journey'
        }
      </StatusMessage>
    </AppContainer>
  );
};

export default MeditationApp;
