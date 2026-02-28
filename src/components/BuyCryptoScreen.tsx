"use client";

import { useState } from "react";
import {
  Badge,
  Card,
  Column,
  Heading,
  Line,
  NumberInput,
  Row,
  Text,
} from "@once-ui-system/core";
import { CryptoSlider } from "./CryptoSlider";

const AVAILABLE_BALANCE = 100; // EUR
const BTC_PRICE = 85_000; // EUR per BTC

export function BuyCryptoScreen() {
  const [percentage, setPercentage] = useState(0);

  const purchaseAmount = (percentage / 100) * AVAILABLE_BALANCE;
  const btcAmount = purchaseAmount / BTC_PRICE;

  function handleAmountChange(value: number) {
    if (isNaN(value)) return;
    const clamped = Math.min(Math.max(value, 0), AVAILABLE_BALANCE);
    setPercentage((clamped / AVAILABLE_BALANCE) * 100);
  }

  return (
    <Column fillWidth center padding="l" style={{ minHeight: "100vh" }}>
      <Card
        direction="column"
        fillWidth
        maxWidth="xs"
        padding="l"
        gap="l"
        border="neutral-alpha-medium"
        radius="l"
      >
        {/* Header */}
        <Column gap="4">
          <Heading variant="heading-strong-l">Buy Bitcoin</Heading>
          <Text variant="body-default-s" onBackground="neutral-weak">
            BTC · Bitcoin
          </Text>
        </Column>

        <Line background="neutral-alpha-weak" />

        {/* Balance & price info */}
        <Column gap="8">
          <Row horizontal="between" fillWidth vertical="center">
            <Text variant="body-default-s" onBackground="neutral-weak">
              Available balance
            </Text>
            <Text variant="body-strong-s">
              €{AVAILABLE_BALANCE.toFixed(2)}
            </Text>
          </Row>
          <Row horizontal="between" fillWidth vertical="center">
            <Text variant="body-default-s" onBackground="neutral-weak">
              Bitcoin price
            </Text>
            <Text variant="body-default-s" onBackground="neutral-medium">
              €{BTC_PRICE.toLocaleString("de-DE")}
            </Text>
          </Row>
        </Column>

        <Line background="neutral-alpha-weak" />

        {/* Amount input */}
        <Column gap="8">
          <NumberInput
            id="purchase-amount"
            label="Amount (EUR)"
            value={purchaseAmount}
            min={0}
            max={AVAILABLE_BALANCE}
            step={0.01}
            onChange={handleAmountChange}
            hasPrefix={<Text variant="body-default-m">€</Text>}
          />
          <Row horizontal="between" fillWidth vertical="center">
            <Text variant="body-default-xs" onBackground="neutral-weak">
              ≈ {btcAmount.toFixed(8)} BTC
            </Text>
            {percentage > 0 && (
              <Badge
                textVariant="body-default-xs"
                border="neutral-alpha-medium"
                onBackground="neutral-weak"
                paddingX="8"
                paddingY="4"
              >
                {Math.round(percentage)}% of balance
              </Badge>
            )}
          </Row>
        </Column>

        {/* Slider */}
        <CryptoSlider percentage={percentage} onChange={setPercentage} />
      </Card>
    </Column>
  );
}
