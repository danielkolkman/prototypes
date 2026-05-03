import React, { useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { PercentageSlider } from '../components/crypto-percentage-slider/PercentageSlider';

const AVAILABLE_BALANCE = 50;
const ASSET = 'Bitcoin';
const BITCOIN_PRICE = 65_000;

interface Props {
  onBack: () => void;
}

export function CryptoSliderScreen({ onBack }: Props) {
  const [percentage, setPercentage] = useState(0);

  const purchaseAmount = (percentage / 100) * AVAILABLE_BALANCE;
  const btcAmount = purchaseAmount / BITCOIN_PRICE;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backText}>‹ Back</Text>
        </TouchableOpacity>
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
          <PercentageSlider value={percentage} onChange={setPercentage} />
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
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
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
    backgroundColor: '#2a2a2a',
  },
  label: {
    color: '#888888',
    fontSize: 14,
  },
  value: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '500',
  },
  sliderSection: {
    gap: 16,
  },
  amountLabel: {
    color: '#F7931A',
    fontSize: 14,
    fontWeight: '500',
  },
  btcLabel: {
    color: '#888888',
    fontSize: 14,
  },
});
