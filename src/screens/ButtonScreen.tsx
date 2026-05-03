import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from '../components/button/Button';

interface Props {
  onBack: () => void;
}

export function ButtonScreen({ onBack }: Props) {
  const [loading, setLoading] = useState(false);

  function handleLoadingDemo() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
        <Text style={styles.heading}>Button</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Primary</Text>
          <Button label="Buy Bitcoin" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Secondary</Text>
          <Button label="Cancel" variant="secondary" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Ghost</Text>
          <Button label="Learn more" variant="ghost" />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Loading</Text>
          <Button label="Buy Bitcoin" loading={loading} onPress={handleLoadingDemo} />
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Disabled</Text>
          <Button label="Buy Bitcoin" disabled />
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
  section: {
    marginBottom: 24,
    gap: 10,
  },
  label: {
    color: '#888888',
    fontSize: 12,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});
