import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { PercentageSlider } from '../components/crypto-percentage-slider/PercentageSlider';
import { useTheme } from '../theme/ThemeContext';
import type { ThemeId } from '../theme/ThemeContext';

const AVAILABLE_BALANCE = 1500;
const BITCOIN_PRICE = 65_000;
/** Inset from the safe-area edges for all page content (slider stays inside this band). */
const PAGE_PADDING = 24;

interface Props {
  onBack: () => void;
}

const THEME_OPTIONS: { id: ThemeId; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
];

/** Whole euros as digits only (no grouping / no decimal separator) — slider + max paste. */
function formatEuroWholeDigits(euros: number): string {
  if (euros === 0) return '';
  return String(Math.round(euros));
}

/**
 * Parse amount typed with `de-DE` rules: `.` is thousands separator, `,` is decimal.
 * Without a comma, a lone middle dot is only treated as thousands when the string looks
 * like grouped triples (e.g. `1.500` → 1500), not `1.50` → 1.5.
 */
function parseAmountInputForDeDE(raw: string): number | null {
  const cleaned = raw.replace(/[^\d.,]/g, '').trim();
  if (cleaned === '' || cleaned === '.' || cleaned === ',') {
    return null;
  }
  let normalized: string;
  if (cleaned.includes(',')) {
    normalized = cleaned.replace(/\./g, '').replace(',', '.');
  } else if (/^\d{1,3}(\.\d{3})+$/.test(cleaned)) {
    normalized = cleaned.replace(/\./g, '');
  } else {
    normalized = cleaned.replace(',', '.');
  }
  const n = parseFloat(normalized);
  return Number.isFinite(n) ? n : null;
}

const EMPTY_FIELD_ZERO_PCT_MS = 160;

export function CryptoSliderScreen({ onBack }: Props) {
  const { colors, themeId, setThemeId, isDark } = useTheme();
  const [percentage, setPercentage] = useState(0);
  const [amountInput, setAmountInput] = useState('');
  const amountInputRef = useRef<TextInput>(null);
  const zeroPctTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearZeroPctTimer = useCallback(() => {
    if (zeroPctTimerRef.current != null) {
      clearTimeout(zeroPctTimerRef.current);
      zeroPctTimerRef.current = null;
    }
  }, []);

  useEffect(() => () => clearZeroPctTimer(), [clearZeroPctTimer]);

  const purchaseAmount = (percentage / 100) * AVAILABLE_BALANCE;
  const btcAmount = purchaseAmount / BITCOIN_PRICE;

  const handleSliderChange = (value: number) => {
    setPercentage(value);
    const euros = (value / 100) * AVAILABLE_BALANCE;
    setAmountInput(formatEuroWholeDigits(euros));
  };

  const refocusAmountInput = useCallback(() => {
    requestAnimationFrame(() => {
      amountInputRef.current?.focus();
    });
  }, []);

  const onAmountChangeText = (text: string) => {
    let cleaned = text.replace(/[^\d.,]/g, '');
    if (/^0\d/.test(cleaned) && !/^0[.,]/.test(cleaned)) {
      cleaned = cleaned.replace(/^0+/, '') || '';
    }
    setAmountInput(cleaned);

    if (cleaned !== '') {
      clearZeroPctTimer();
    }

    const n = parseAmountInputForDeDE(cleaned);
    if (n === null) {
      // Debounce: RN can emit a transient "" while backspacing; don't snap the slider to 0
      // until the field stays empty briefly.
      if (cleaned === '') {
        clearZeroPctTimer();
        zeroPctTimerRef.current = setTimeout(() => {
          zeroPctTimerRef.current = null;
          setPercentage(0);
        }, EMPTY_FIELD_ZERO_PCT_MS);
      }
      return;
    }

    clearZeroPctTimer();

    if (Math.abs(n - AVAILABLE_BALANCE) < 1e-6) {
      setPercentage(100);
      setAmountInput(String(AVAILABLE_BALANCE));
      return;
    }

    if (n > AVAILABLE_BALANCE) {
      // Slider caps at 100%; never rewrite the field — the typed string stays as-is.
      setPercentage(100);
      return;
    }
    if (n < 0) {
      setPercentage(0);
      return;
    }

    setPercentage(prev => {
      let next = Math.min(100, Math.max(0, (n / AVAILABLE_BALANCE) * 100));
      // After Max, "1.500" → "1.50" parses as €1.5 (~0.1%). Pill uses Math.round → looks like 0%.
      // While still coming down from near-max, keep at least 1% so the thumb doesn't read as reset.
      if (next > 0 && next < 1 && prev >= 95) {
        next = 1;
      }
      return next;
    });
  };

  const styles = useMemo(
    () =>
      StyleSheet.create({
        safe: {
          flex: 1,
          backgroundColor: colors.background,
        },
        container: {
          flex: 1,
          padding: PAGE_PADDING,
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
        themeSection: {
          marginBottom: 20,
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
        amountBlock: {
          marginBottom: 24,
        },
        /** Slider + status row span the full width of the padded content column. */
        sliderSection: {
          alignSelf: 'stretch',
          width: '100%',
        },
        amountSwapper: {
          height: 160,
          justifyContent: 'center',
          alignItems: 'stretch',
        },
        amountInputGroup: {
          alignSelf: 'stretch',
        },
        amountInputWrap: {
          flexDirection: 'row',
          alignItems: 'center',
          flexShrink: 0,
        },
        btcReceiveLabel: {
          marginTop: 16,
          fontSize: 14,
          lineHeight: 20,
          color: colors.textSecondary,
        },
        btcReceiveAmount: {
          color: colors.textPrimary,
          fontWeight: '600',
          fontVariant: ['tabular-nums'] as const,
        },
        euroPrefix: {
          fontSize: 48,
          color: colors.textPrimary,
          marginRight: 4,
          includeFontPadding: false,
        },
        amountInput: {
          flex: 1,
          minWidth: 0,
          fontSize: 48,
          color: colors.textPrimary,
          padding: 0,
          margin: 0,
          backgroundColor: 'transparent',
          borderWidth: 0,
          includeFontPadding: false,
          fontVariant: ['tabular-nums'] as const,
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
          <View style={styles.themeChips}>
            {THEME_OPTIONS.map(opt => {
              const active = themeId === opt.id;
              return (
                <TouchableOpacity
                  key={opt.id}
                  onPress={() => {
                    setThemeId(opt.id);
                    refocusAmountInput();
                  }}
                  style={[
                    styles.themeChip,
                    active && {
                      borderColor: colors.accent,
                      backgroundColor: colors.background,
                    },
                  ]}
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityLabel={`${opt.label} theme`}
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
        </View>

        <Text style={styles.heading}>Crypto Percentage Slider</Text>

        <View style={styles.amountBlock}>
          <View style={styles.amountSwapper}>
            <View
              style={styles.amountInputGroup}
              accessible
              accessibilityLabel={`Swap amount €${amountInput}, approximately ${btcAmount.toFixed(8)} BTC`}
            >
              <View style={styles.amountInputWrap}>
                <Text style={styles.euroPrefix} importantForAccessibility="no">
                  €
                </Text>
                <TextInput
                  ref={amountInputRef}
                  value={amountInput}
                  onChangeText={onAmountChangeText}
                  autoFocus
                  showSoftInputOnFocus
                  blurOnSubmit={false}
                  onBlur={() => {
                    refocusAmountInput();
                  }}
                  keyboardType="decimal-pad"
                  keyboardAppearance={isDark ? 'dark' : 'light'}
                  underlineColorAndroid="transparent"
                  selectionColor={colors.accent}
                  style={styles.amountInput}
                  importantForAccessibility="no"
                />
              </View>
              <Text style={styles.btcReceiveLabel}>
                ≈{' '}
                <Text style={styles.btcReceiveAmount}>
                  {btcAmount.toFixed(8)} BTC
                </Text>
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.sliderSection}>
          <PercentageSlider
            value={percentage}
            onChange={handleSliderChange}
            labelPrefix="Swap "
            maxLabel="Max"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}
