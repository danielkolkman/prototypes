import React, { useCallback, useRef, useState } from 'react';
import {
  Animated,
  GestureResponderEvent,
  LayoutChangeEvent,
  PanResponder,
  StyleSheet,
  View,
} from 'react-native';

interface Props {
  value?: number;
  onChange?: (value: number) => void;
}

const THUMB_SIZE = 28;
const TRACK_HEIGHT = 4;
const SNAP_POINTS = [0, 25, 50, 75, 100];

export function PercentageSlider({ value: initial = 0, onChange }: Props) {
  const [trackWidth, setTrackWidth] = useState(0);
  const animatedValue = useRef(new Animated.Value(initial / 100)).current;

  const snap = useCallback((raw: number): number => {
    const nearest = SNAP_POINTS.reduce((prev, curr) =>
      Math.abs(curr - raw) < Math.abs(prev - raw) ? curr : prev,
    );
    return Math.abs(nearest - raw) < 8 ? nearest : raw;
  }, []);

  const update = useCallback(
    (x: number, release: boolean) => {
      if (trackWidth === 0) return;
      const pct = Math.max(0, Math.min(100, (x / trackWidth) * 100));
      const next = release ? snap(pct) : pct;
      Animated.spring(animatedValue, {
        toValue: next / 100,
        useNativeDriver: false,
        speed: release ? 20 : 100,
        bounciness: release ? 4 : 0,
      }).start();
      onChange?.(Math.round(next));
    },
    [animatedValue, onChange, snap, trackWidth],
  );

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (e: GestureResponderEvent) => update(e.nativeEvent.locationX, false),
      onPanResponderMove: (e: GestureResponderEvent) => update(e.nativeEvent.locationX, false),
      onPanResponderRelease: (e: GestureResponderEvent) => update(e.nativeEvent.locationX, true),
    }),
  ).current;

  const thumbLeft = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth - THUMB_SIZE],
  });

  const fillWidth = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, trackWidth],
  });

  return (
    <View
      style={styles.track}
      onLayout={(e: LayoutChangeEvent) => setTrackWidth(e.nativeEvent.layout.width)}
      {...pan.panHandlers}
    >
      <View style={styles.rail} />
      <Animated.View style={[styles.fill, { width: fillWidth }]} />
      {SNAP_POINTS.map(p => (
        <View key={p} style={[styles.dot, { left: `${p}%` as unknown as number }]} />
      ))}
      <Animated.View style={[styles.thumb, { left: thumbLeft }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    height: 44,
    justifyContent: 'center',
  },
  rail: {
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: '#2a2a2a',
  },
  fill: {
    position: 'absolute',
    height: TRACK_HEIGHT,
    borderRadius: TRACK_HEIGHT / 2,
    backgroundColor: '#F7931A',
    top: (44 - TRACK_HEIGHT) / 2,
  },
  dot: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#3a3a3a',
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
    borderColor: '#F7931A',
    top: (44 - THUMB_SIZE) / 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
  },
});
