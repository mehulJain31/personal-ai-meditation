import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const breathe = keyframes`
  0%, 100% { transform: scale(1); opacity: 0.8; }
  50% { transform: scale(1.1); opacity: 1; }
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Main App Container
export const AppContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #a8e6cf 0%, #dcedc1 25%, #ffd3b6 50%, #ffaaa5 75%, #ff8b94 100%);
  background-size: 400% 400%;
  animation: ${gradientShift} 20s ease infinite;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  color: #2c5530;
  overflow: hidden;
`;

// Header
export const Header = styled.header`
  text-align: center;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-out;
`;

export const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 300;
  margin: 0;
  text-shadow: 2px 2px 4px rgba(44, 85, 48, 0.2);
  background: linear-gradient(45deg, #2c5530, #4a7c59);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

export const Subtitle = styled.p`
  font-size: 1.2rem;
  margin: 0.5rem 0 0 0;
  opacity: 0.9;
  font-weight: 300;
`;

// Duration Selection
export const DurationContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  justify-content: center;
  animation: ${fadeIn} 1s ease-out 0.2s both;
`;

export const DurationButton = styled.button<{ selected: boolean }>`
  padding: 1rem 2rem;
  border: 2px solid rgba(44, 85, 48, 0.3);
  border-radius: 50px;
  background: ${props => props.selected 
    ? 'rgba(168, 230, 207, 0.3)' 
    : 'rgba(255, 255, 255, 0.2)'};
  color: #2c5530;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 120px;
  
  &:hover {
    background: rgba(168, 230, 207, 0.4);
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(44, 85, 48, 0.2);
  }
  
  ${props => props.selected && `
    border-color: rgba(44, 85, 48, 0.8);
    box-shadow: 0 0 20px rgba(168, 230, 207, 0.4);
  `}
`;

// Timer Display
export const TimerContainer = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  animation: ${fadeIn} 1s ease-out 0.4s both;
`;

export const TimerDisplay = styled.div`
  font-size: 6rem;
  font-weight: 200;
  margin: 1rem 0;
  text-shadow: 3px 3px 6px rgba(44, 85, 48, 0.2);
  letter-spacing: 0.1em;
  color: #2c5530;
`;

export const TimerLabel = styled.div`
  font-size: 1.2rem;
  opacity: 0.8;
  margin-bottom: 1rem;
`;

// Control Buttons
export const ControlsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  animation: ${fadeIn} 1s ease-out 0.6s both;
`;

export const ControlButton = styled.button<{ variant?: 'primary' | 'secondary' | 'danger' }>`
  padding: 1rem 2.5rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 140px;
  
  ${props => {
    switch (props.variant) {
      case 'primary':
        return `
          background: linear-gradient(45deg, #7fb069, #6a994e);
          color: white;
          box-shadow: 0 4px 15px rgba(127, 176, 105, 0.4);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(127, 176, 105, 0.6);
          }
        `;
      case 'secondary':
        return `
          background: rgba(255, 255, 255, 0.3);
          color: #2c5530;
          border: 2px solid rgba(44, 85, 48, 0.3);
          
          &:hover {
            background: rgba(168, 230, 207, 0.4);
            transform: translateY(-2px);
          }
        `;
      case 'danger':
        return `
          background: linear-gradient(45deg, #e76f51, #d62828);
          color: white;
          box-shadow: 0 4px 15px rgba(231, 111, 81, 0.4);
          
          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(231, 111, 81, 0.6);
          }
        `;
      default:
        return `
          background: rgba(255, 255, 255, 0.3);
          color: #2c5530;
          border: 2px solid rgba(44, 85, 48, 0.3);
          
          &:hover {
            background: rgba(168, 230, 207, 0.4);
            transform: translateY(-2px);
          }
        `;
    }
  }}
`;

// Breathing Animation
export const BreathingCircle = styled.div<{ isActive: boolean }>`
  width: 200px;
  height: 200px;
  border: 3px solid rgba(168, 230, 207, 0.6);
  border-radius: 50%;
  margin: 2rem auto;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: ${props => props.isActive ? breathe : 'none'} 4s ease-in-out infinite;
  backdrop-filter: blur(10px);
  background: rgba(168, 230, 207, 0.2);
  
  &::before {
    content: '';
    width: 150px;
    height: 150px;
    border: 2px solid rgba(44, 85, 48, 0.4);
    border-radius: 50%;
    animation: ${props => props.isActive ? breathe : 'none'} 4s ease-in-out infinite reverse;
  }
`;

// Volume Controls
export const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  animation: ${fadeIn} 1s ease-out 0.8s both;
`;

export const VolumeSlider = styled.input`
  width: 150px;
  height: 6px;
  border-radius: 3px;
  background: rgba(168, 230, 207, 0.4);
  outline: none;
  -webkit-appearance: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #7fb069;
    cursor: pointer;
    box-shadow: 0 2px 6px rgba(44, 85, 48, 0.3);
  }
  
  &::-moz-range-thumb {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #7fb069;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 6px rgba(44, 85, 48, 0.3);
  }
`;

export const VolumeLabel = styled.span`
  font-size: 0.9rem;
  opacity: 0.8;
  min-width: 60px;
`;

export const VoiceQualityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 1rem;
  animation: ${fadeIn} 1s ease-out 0.8s both;
`;

export const VoiceQualityButton = styled.button<{ selected: boolean }>`
  padding: 0.5rem 1rem;
  border: 2px solid rgba(44, 85, 48, 0.3);
  border-radius: 25px;
  background: ${props => props.selected 
    ? 'rgba(168, 230, 207, 0.3)' 
    : 'rgba(255, 255, 255, 0.2)'};
  color: #2c5530;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(168, 230, 207, 0.4);
    transform: translateY(-1px);
  }
  
  ${props => props.selected && `
    border-color: rgba(44, 85, 48, 0.8);
    box-shadow: 0 0 15px rgba(168, 230, 207, 0.4);
  `}
`;

export const VoiceSelector = styled.select`
  padding: 0.5rem 1rem;
  border: 2px solid rgba(44, 85, 48, 0.3);
  border-radius: 25px;
  background: rgba(255, 255, 255, 0.2);
  color: #2c5530;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  outline: none;
  
  &:hover {
    background: rgba(168, 230, 207, 0.4);
    transform: translateY(-1px);
  }
  
  option {
    background: #a8e6cf;
    color: #2c5530;
  }
`;

// Status Message
export const StatusMessage = styled.div`
  font-size: 1.1rem;
  opacity: 0.9;
  margin: 1rem 0;
  text-align: center;
  animation: ${fadeIn} 1s ease-out 1s both;
`;

// Progress Bar
export const ProgressContainer = styled.div`
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  animation: ${fadeIn} 1s ease-out 0.4s both;
`;

export const ProgressBar = styled.div<{ progress: number }>`
  width: 100%;
  height: 8px;
  background: rgba(168, 230, 207, 0.3);
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: ${props => props.progress}%;
    background: linear-gradient(90deg, #7fb069, #6a994e);
    border-radius: 4px;
    transition: width 0.3s ease;
  }
`;

// Meditation Phase Display
export const PhaseContainer = styled.div`
  text-align: center;
  margin: 1rem 0;
  animation: ${fadeIn} 1s ease-out 0.6s both;
`;

export const PhaseName = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  margin-bottom: 0.5rem;
`;

export const PhaseDescription = styled.div`
  font-size: 1rem;
  opacity: 0.8;
  line-height: 1.4;
`;
