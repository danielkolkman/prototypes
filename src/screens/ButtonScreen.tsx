import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from '../components/button/Button';
import { ThemeSwitcher } from '../components/ThemeSwitcher';
import { useTheme } from '../theme/ThemeContext';

interface Props {
  onBack: () => void;
}

export function ButtonScreen({ onBack }: Props) {
  const { colors } = useTheme();
  const [loading, setLoading] = useState(false);

  function handleLoadingDemo() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

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
          marginBottom: 16,
          minHeight: 44,
        },
        backButton: {
          paddingVertical: 8,
          paddingRight: 12,
        },
        backText: {
          color: colors.accent,
          fontSize: 17,
        },
        heading: {
          color: colors.textPrimary,
          fontSize: 22,
          fontWeight: '700',
          marginBottom: 40,
        },
        section: {
          marginBottom: 24,
          gap: 10,
        },
        label: {
          color: colors.textSecondary,
          fontSize: 12,
          textTransform: 'uppercase',
          letterSpacing: 1,
        },
      }),
    [colors],
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <View style={styles.topNav}>
          <TouchableOpacity style={styles.backButton} onPress={onBack}>
            <Text style={styles.backText}>‹ Back</Text>
          </TouchableOpacity>
          <ThemeSwitcher />
        </View>
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
