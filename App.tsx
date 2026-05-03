import React, { useState } from 'react';
import { StatusBar } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { CryptoSliderScreen } from './src/screens/CryptoSliderScreen';
import { ButtonScreen } from './src/screens/ButtonScreen';
import { ThemeProvider, useTheme } from './src/theme/ThemeContext';

type Screen = 'Home' | 'CryptoSlider' | 'Button';

function AppContent() {
  const [screen, setScreen] = useState<Screen>('Home');
  const { usesLightStatusBarContent } = useTheme();

  return (
    <>
      <StatusBar
        barStyle={
          usesLightStatusBarContent ? 'dark-content' : 'light-content'
        }
        backgroundColor="transparent"
        translucent
      />
      {screen === 'CryptoSlider' ? (
        <CryptoSliderScreen onBack={() => setScreen('Home')} />
      ) : screen === 'Button' ? (
        <ButtonScreen onBack={() => setScreen('Home')} />
      ) : (
        <HomeScreen onNavigate={setScreen} />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}
