import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PercentageSlider } from '../components/crypto-percentage-slider/PercentageSlider';

interface Props {
  onBack: () => void;
}

export function CryptoSliderScreen({ onBack }: Props) {
  const [percentage, setPercentage] = useState(0);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Crypto Percentage Slider</Text>
        <View style={styles.preview}>
          <PercentageSlider value={percentage} onChange={setPercentage} />
          <Text style={styles.value}>{percentage}%</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#0d0d0d',
  },
  container: {
    flex: 1,
    padding: 24,
  },
  backButton: {
    marginBottom: 24,
  },
  backText: {
    color: '#F7931A',
    fontSize: 17,
  },
  heading: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 40,
  },
  preview: {
    gap: 20,
  },
  value: {
    color: '#888888',
    fontSize: 14,
    textAlign: 'center',
  },
});
