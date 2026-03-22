"use client";

import { Column, Row, Slider, Text } from "@once-ui-system/core";

interface CryptoSliderProps {
  percentage: number;
  onChange: (percentage: number) => void;
}

const TICK_LABELS = ["0%", "25%", "50%", "75%", "100%"];

export function CryptoSlider({ percentage, onChange }: CryptoSliderProps) {
  return (
    <Column gap="4" fillWidth>
      <Slider
        value={[percentage]}
        onValueChange={([value]: number[]) => onChange(value)}
        min={0}
        max={100}
        step={1}
      />
      <Row horizontal="between" fillWidth paddingX="2">
        {TICK_LABELS.map((label) => (
          <Text
            key={label}
            variant="body-default-xs"
            onBackground="neutral-weak"
          >
            {label}
          </Text>
        ))}
      </Row>
    </Column>
  );
}
