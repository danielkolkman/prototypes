import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Screen = 'CryptoSlider' | 'Button';

interface Props {
  onNavigate: (screen: Screen) => void;
}

const COMPONENTS: { screen: Screen; title: string; description: string }[] = [
  {
    screen: 'CryptoSlider',
    title: 'Crypto Percentage Slider',
    description: 'A snap-point slider for selecting a percentage of balance.',
  },
  {
    screen: 'Button',
    title: 'Button',
    description: 'Primary, secondary, ghost, loading, and disabled states.',
  },
];

export function HomeScreen({ onNavigate }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.heading}>Components</Text>
        {COMPONENTS.map(item => (
          <TouchableOpacity
            key={item.screen}
            style={styles.card}
            onPress={() => onNavigate(item.screen)}
            activeOpacity={0.7}
          >
            <View style={styles.cardContent}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              <Text style={styles.cardDescription}>{item.description}</Text>
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        ))}
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
  heading: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  cardContent: {
    flex: 1,
  },
  cardTitle: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cardDescription: {
    color: '#888888',
    fontSize: 13,
  },
  arrow: {
    color: '#888888',
    fontSize: 24,
    marginLeft: 8,
  },
});
