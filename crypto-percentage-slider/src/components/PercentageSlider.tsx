import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  Text,
  View,
} from 'react-native';

interface PercentageSliderProps {
  value?: number;
  onChange?: (value: number) => void;
  color?: string;
}

const THUMB_SIZE = 28;
const TRACK_HEIGHT = 4;
const SNAP_POINTS = [0, 25, 50, 75, 100];

export function PercentageSlider({
  value: initialValue = 0,
  onChange,
  color = '#F7931A',
}: PercentageSliderProps) {
  const [trackWidth, setTrackWidth] = useState(0);
  const [percentage, setPercentage] = useState(
    Math.max(0, Math.min(100, initialValue)),
  );
  const animatedValue = useRef(new Animated.Value(initialValue / 100)).current;

  const clampAndSnap = useCallback(
    (raw: number): number => {
      const clamped = Math.max(0, Math.min(100, raw));
      const nearest = SNAP_POINTS.reduce((prev, curr) =>
        Math.abs(curr - clamped) < Math.abs(prev - clamped) ? curr : prev,
      );
      return Math.abs(nearest - clamped) < 8 ? nearest : clamped;
    },
    [],
  );

  const percentageFromX = useCallback(
    (x: number): number => {
      if (trackWidth === 0) return 0;
      return Math.max(0, Math.min(100, (x / trackWidth) * 100));
    },
    [trackWidth],
  );

  const updateValue = useCallback(
    (x: number, snap: boolean) => {
      const raw = percentageFromX(x);
      const next = snap ? clampAndSnap(raw) : Math.max(0, Math.min(100, raw));
      setPercentage(Math.round(next));
      Animated.spring(animatedValue, {
        toValue: next / 100,
        useNativeDriver: false,
        speed: snap ? 20 : 100,
        bounciness: snap ? 4 : 0,
      }).start();
      onChange?.(Math.round(next));
    },
    [animatedValue, clampAndSnap, onChange, percentageFromX],
  );

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e: GestureResponderEvent) => {
        const x = e.nativeEvent.locationX;
        updateValue(x, false);
      },
      onPanResponderMove: (e: GestureResponderEvent) => {
        const x = e.nativeEvent.locationX;
        updateValue(x, false);
      },
      onPanResponderRelease: (e: GestureResponderEvent) => {
        const x = e.nativeEvent.locationX;
        updateValue(x, true);
      },
    }),
  ).current;

  const handleLayout = (e: LayoutChangeEvent) => {
    setTrackWidth(e.nativeEvent.layout.width);
  };

  const thumbLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth - THUMB_SIZE],
  });

  const fillWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth],
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>Amount</Text>
        <Text style={[styles.percentage, { color }]}>{percentage}%</Text>
      </View>

      <View
        style={styles.trackContainer}
        onLayout={handleLayout}
        {...panResponder.panHandlers}
      >
        {/* Track background */}
        <View style={styles.track} />

        {/* Filled portion */}
        <Animated.View style={[styles.fill, { width: fillWidth, backgroundColor: color }]} />

        {/* Snap point markers */}
        {SNAP_POINTS.map(point => (
          <View
            key={point}
            style={[
              styles.snapDot,
              {
                left: `${point}%` as unknown as number,
                backgroundColor: percentage >= point ? color : '#3a3a3a',
              },
            ]}
          />
        ))}

        {/* Thumb */}
        <Animated.View
          style={[
            styles.thumb,
            {
              left: thumbLeft,
              borderColor: color,
            },
          ]}
        />
      </View>

      <View style={styles.snapLabels}>
        {SNAP_POINTS.map(point => (
          <Text key={point} style={styles.snapLabel}>
            {point}%
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 4,
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  label: {
    color: '#9a9a9a',
    fontSize: 14,
    fontWeight: '500',
  },
  percentage: {
    fontSize: 14,
    fontWeight: '700',
  },
  trackContainer: {
    height: 44,
    justifyContent: 'center',
  },
  track: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: '#2a2a2a',
  },
  fill: {
    position: 'absolute',
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    top: (44 - TRACK_HEIGHT) / 2,
    left: 0,
  },
  snapDot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    top: (44 - 8) / 2,
    marginLeft: -4,
  },
  thumb: {
    position: 'absolute',
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#1a1a1a',
    borderWidth: 2.5,
    top: (44 - THUMB_SIZE) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    elevation: 4,
  },
  snapLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  snapLabel: {
    color: '#5a5a5a',
    fontSize: 11,
  },
});
