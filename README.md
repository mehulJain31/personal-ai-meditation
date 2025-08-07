# Meditation App

A beautiful desktop meditation application built with React, TypeScript, and Electron. This app provides guided meditation sessions with soothing voice guidance and a calming user interface.

## Features

- **Multiple Session Durations**: Choose from 10, 12, 15, or 20-minute meditation sessions
- **Voice Guidance**: Soothing voice prompts that guide you through each phase of meditation
- **Beautiful UI**: Calming gradient backgrounds and smooth animations
- **Breathing Animation**: Visual breathing guide during active sessions
- **Volume Control**: Adjustable volume and mute functionality
- **Progress Tracking**: Visual progress bar and phase indicators
- **Desktop App**: Runs as a native desktop application using Electron

## Voice Guidance Schedule

The app provides gentle voice guidance at specific intervals:

- **0 minutes**: Opening guidance - body scan and breathing introduction
- **2 minutes**: Breathing exercise with counting (4-count inhale, 6-count exhale)
- **5 minutes**: Reminder to maintain focus and observe thoughts
- **8 minutes**: Additional guidance for 12+ minute sessions
- **11 minutes**: Guidance for 15+ minute sessions
- **14 minutes**: Guidance for 20-minute sessions
- **17 minutes**: Final guidance for 20-minute sessions
- **Last 30 seconds**: Closing guidance and gentle conclusion

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd meditation-app
```

2. Install dependencies:
```bash
npm install
```

3. Set up ElevenLabs API (Optional but recommended for best voice quality):
   - Sign up for a free account at [ElevenLabs](https://elevenlabs.io/app/speech-synthesis/text-to-speech)
   - Get your API key from the ElevenLabs dashboard
   - Create a `.env` file in the root directory and add:
   ```
   REACT_APP_ELEVENLABS_API_KEY=your_api_key_here
   ```
   - The app will fallback to browser speech synthesis if no API key is provided

## Development

To run the app in development mode:

```bash
# Start the React development server
npm start

# In another terminal, run the Electron app
npm run electron-dev
```

Or run both simultaneously:
```bash
npm run electron-dev
```

## Building for Production

To build the app for distribution:

```bash
# Build the React app
npm run build

# Package with Electron
npm run electron-pack
```

## Available Scripts

- `npm start` - Start the React development server
- `npm run build` - Build the React app for production
- `npm run electron` - Run the Electron app (requires built React app)
- `npm run electron-dev` - Run both React dev server and Electron app
- `npm run electron-pack` - Build and package the app for distribution
- `npm run dist` - Create distribution packages

## Usage

1. **Select Duration**: Choose your preferred meditation duration (10, 12, 15, or 20 minutes)
2. **Adjust Volume**: Use the volume slider to set your preferred audio level
3. **Start Session**: Click "Start Meditation" to begin your session
4. **Follow Guidance**: Listen to the soothing voice guidance and follow the breathing animation
5. **Pause/Stop**: Use the pause button to temporarily stop or stop button to end the session

## Technical Details

- **Frontend**: React 18 with TypeScript
- **Styling**: Styled Components for beautiful, responsive design
- **Desktop**: Electron for cross-platform desktop application
- **Voice**: ElevenLabs API for ultra-realistic text-to-speech (with browser fallback)
- **Animations**: CSS animations and keyframes for smooth transitions

## Voice Features

The app uses ElevenLabs API to provide:
- Ultra-realistic, human-like voices
- Multiple voice options to choose from
- Optimized voice settings for meditation
- Automatic fallback to browser speech synthesis
- Volume control and mute functionality
- Preloaded common phrases for better performance

## Color Scheme

The app uses a calming purple gradient background that shifts slowly, creating a peaceful atmosphere perfect for meditation.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open an issue on the repository.
