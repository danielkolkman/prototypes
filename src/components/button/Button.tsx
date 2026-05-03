import React, { useMemo } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import { useTheme } from '../../theme/ThemeContext';

interface Props extends TouchableOpacityProps {
  label: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  loading?: boolean;
}

export function Button({
  label,
  variant = 'primary',
  loading = false,
  disabled,
  style,
  ...rest
}: Props) {
  const { colors } = useTheme();
  const isDisabled = disabled || loading;

  const themed = useMemo(
    () =>
      StyleSheet.create({
        primary: { backgroundColor: colors.accent },
        secondary: {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: colors.accent,
        },
        ghost: { backgroundColor: 'transparent' },
        primaryLabel: { color: colors.primaryButtonLabel },
        secondaryLabel: { color: colors.accent },
        ghostLabel: { color: colors.ghostButtonLabel },
      }),
    [colors],
  );

  return (
    <TouchableOpacity
      style={[
        styles.base,
        themed[variant],
        isDisabled && styles.disabled,
        style,
      ]}
      activeOpacity={0.7}
      disabled={isDisabled}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'primary' ? colors.primaryButtonLabel : colors.accent}
        />
      ) : (
        <Text style={[styles.label, themed[`${variant}Label`]]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
  },
});
