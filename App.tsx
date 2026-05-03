import React, { useState } from 'react';
import { HomeScreen } from './src/screens/HomeScreen';
import { CryptoSliderScreen } from './src/screens/CryptoSliderScreen';
import { ButtonScreen } from './src/screens/ButtonScreen';

type Screen = 'Home' | 'CryptoSlider' | 'Button';

export default function App() {
  const [screen, setScreen] = useState<Screen>('Home');

  if (screen === 'CryptoSlider') {
    return <CryptoSliderScreen onBack={() => setScreen('Home')} />;
  }

  if (screen === 'Button') {
    return <ButtonScreen onBack={() => setScreen('Home')} />;
  }

  return <HomeScreen onNavigate={setScreen} />;
}
