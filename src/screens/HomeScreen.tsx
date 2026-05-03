import React, { useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useTheme } from '../theme/ThemeContext';

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
  const { colors } = useTheme();

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: colors.background,
        },
        container: {
          flex: 1,
          padding: 24,
        },
        topNav: {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 24,
          minHeight: 44,
        },
        heading: {
          color: colors.textPrimary,
          fontSize: 28,
          fontWeight: '700',
          flex: 1,
          marginRight: 12,
        },
        card: {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: colors.surface,
          borderRadius: 12,
          padding: 16,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: colors.border,
        },
        cardContent: {
          flex: 1,
        },
        cardTitle: {
          color: colors.textPrimary,
          fontSize: 16,
          fontWeight: '600',
          marginBottom: 4,
        },
        cardDescription: {
          color: colors.textSecondary,
          fontSize: 13,
        },
        arrow: {
          color: colors.textSecondary,
          fontSize: 24,
          marginLeft: 8,
        },
      }),
    [colors],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topNav}>
          <Text style={styles.heading}>Components</Text>
          <ThemeSwitcher />
        </View>
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
