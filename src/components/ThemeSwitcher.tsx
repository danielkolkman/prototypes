import React, { useCallback } from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

export function ThemeSwitcher() {
  const { themeId, setThemeId, colors, isDark } = useTheme();
  const isLight = themeId === 'light';

  const onToggle = useCallback(
    (nextLight: boolean) => setThemeId(nextLight ? 'light' : 'dark'),
    [setThemeId],
  );

  const trackOff = isDark ? '#3a3a3a' : colors.border;
  const trackOn = '#fdba74';

  return (
    <View style={styles.row}>
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        Dark
      </Text>
      <Switch
        accessibilityLabel="Toggle dark or light theme"
        value={isLight}
        onValueChange={onToggle}
        trackColor={{
          false: trackOff,
          true: trackOn,
        }}
        thumbColor={isLight ? '#ffffff' : '#f4f4f5'}
        ios_backgroundColor={trackOff}
      />
      <Text style={[styles.label, { color: colors.textSecondary }]}>
        Light
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
