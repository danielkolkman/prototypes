import React, { useState } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PercentageSlider } from './src/components/PercentageSlider';

const BTC_BALANCE = 0.84271;
const BTC_PRICE_USD = 62_430;

export default function App() {
  const [percentage, setPercentage] = useState(0);

  const btcAmount = (BTC_BALANCE * percentage) / 100;
  const usdAmount = btcAmount * BTC_PRICE_USD;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#0d0d0d" />

      <View style={styles.container}>
        <Text style={styles.title}>Buy BTC</Text>

        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available balance</Text>
          <Text style={styles.balanceAmount}>
            {BTC_BALANCE.toFixed(5)}{' '}
            <Text style={styles.balanceCurrency}>BTC</Text>
          </Text>
        </View>

        <View style={styles.orderCard}>
          <View style={styles.amountRow}>
            <Text style={styles.amountLabel}>You buy</Text>
            <View style={styles.amountValues}>
              <Text style={styles.amountBtc}>{btcAmount.toFixed(5)} BTC</Text>
              <Text style={styles.amountUsd}>
                ≈ ${usdAmount.toLocaleString('en-US', { maximumFractionDigits: 2 })}
              </Text>
            </View>
          </View>

          <View style={styles.divider} />

          <PercentageSlider
            value={percentage}
            onChange={setPercentage}
            color="#F7931A"
          />
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
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 24,
  },
  balanceCard: {
    backgroundColor: '#161616',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  balanceLabel: {
    color: '#6a6a6a',
    fontSize: 13,
    marginBottom: 6,
  },
  balanceAmount: {
    color: '#ffffff',
    fontSize: 26,
    fontWeight: '700',
  },
  balanceCurrency: {
    color: '#F7931A',
    fontSize: 18,
    fontWeight: '600',
  },
  orderCard: {
    backgroundColor: '#161616',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  amountLabel: {
    color: '#6a6a6a',
    fontSize: 13,
  },
  amountValues: {
    alignItems: 'flex-end',
  },
  amountBtc: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
  amountUsd: {
    color: '#6a6a6a',
    fontSize: 13,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a2a',
    marginBottom: 20,
  },
});
