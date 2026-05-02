import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { PercentageSlider } from './src/components/PercentageSlider';

export default function App() {
  const [percentage, setPercentage] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <PercentageSlider value={percentage} onChange={setPercentage} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#0d0d0d',
  },
});
