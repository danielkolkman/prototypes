import React, { useMemo, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PercentageSlider } from '../components/crypto-percentage-slider/PercentageSlider';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeId } from '../theme/ThemeContext';

const AVAILABLE_BALANCE = 50;
const ASSET = 'Bitcoin';
const BITCOIN_PRICE = 65_000;

interface Props {
  onBack: () => void;
}

const THEME_OPTIONS: { id: ThemeId; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

export function CryptoSliderScreen({ onBack }: Props) {
  const { colors, themeId, setThemeId } = useTheme();
  const [percentage, setPercentage] = useState(0);

  const purchaseAmount = (percentage / 100) * AVAILABLE_BALANCE;
  const btcAmount = purchaseAmount / BITCOIN_PRICE;

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
          marginBottom: 24,
        },
        infoCard: {
          backgroundColor: colors.surface,
          borderRadius: 12,
          borderWidth: 1,
          borderColor: colors.border,
          paddingHorizontal: 16,
          marginBottom: 32,
        },
        row: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingVertical: 14,
        },
        divider: {
          height: 1,
          backgroundColor: colors.border,
        },
        label: {
          color: colors.textSecondary,
          fontSize: 14,
        },
        value: {
          color: colors.textPrimary,
          fontSize: 14,
          fontWeight: '500',
        },
        sliderSection: {
          gap: 16,
        },
        amountLabel: {
          color: colors.accent,
          fontSize: 14,
          fontWeight: '500',
        },
        btcLabel: {
          color: colors.textSecondary,
          fontSize: 14,
        },
        themeSection: {
          marginBottom: 20,
          gap: 8,
        },
        themeSectionLabel: {
          color: colors.textSecondary,
          fontSize: 12,
          fontWeight: '600',
          letterSpacing: 0.4,
          textTransform: 'uppercase' as const,
        },
        themeChips: {
          flexDirection: 'row',
          flexWrap: 'wrap',
          gap: 8,
        },
        themeChip: {
          paddingVertical: 8,
          paddingHorizontal: 14,
          borderRadius: 20,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
        },
        themeChipText: {
          fontSize: 14,
          fontWeight: '600',
        },
        themeHint: {
          color: colors.textSecondary,
          fontSize: 11,
          lineHeight: 16,
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
        </View>

        <View style={styles.themeSection}>
          <Text style={styles.themeSectionLabel}>Theme on this screen</Text>
          <View style={styles.themeChips}>
            {THEME_OPTIONS.map(opt => {
              const active = themeId === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => setThemeId(opt.id)}
                  style={[
                    styles.themeChip,
                    active && {
                      borderColor: colors.accent,
                      backgroundColor: colors.background,
                    },
                  ]}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityState={{ selected: active }}
                >
                  <Text
                    style={[
                      styles.themeChipText,
                      { color: active ? colors.accent : colors.textPrimary },
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
          <Text style={styles.themeHint}>
            Light: Figma Core Components tokens (node 14806:27950) in
            src/theme/light/ — see light/theme.ts. Dark: src/theme/dark/variables.ts.
          </Text>
        </View>

        <Text style={styles.heading}>Crypto Percentage Slider</Text>

        <View style={styles.infoCard}>
          <View style={styles.row}>
            <Text style={styles.label}>Available balance</Text>
            <Text style={styles.value}>€{AVAILABLE_BALANCE.toFixed(2)}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Select asset</Text>
            <Text style={styles.value}>{ASSET}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Bitcoin price</Text>
            <Text style={styles.value}>€{BITCOIN_PRICE.toLocaleString('de-DE')}</Text>
          </View>
        </View>

        <View style={styles.sliderSection}>
          <PercentageSlider
            value={percentage}
            onChange={setPercentage}
            labelPrefix="Swap "
            maxLabel="Max"
            onMaxPress={() => setPercentage(100)}
          />
          <View style={styles.row}>
            <Text style={styles.amountLabel}>
              {percentage}% · €{purchaseAmount.toFixed(2)}
            </Text>
            <Text style={styles.btcLabel}>{btcAmount.toFixed(8)} BTC</Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
