import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  LayoutChangeEvent,
  PanResponder,
  type GestureResponderEvent,
  type PanResponderGestureState,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import { lightSliderLayout } from '../../theme/light/responsive';
import { useTheme } from '../../theme/ThemeContext';
import { percentageSliderTokens as t } from './percentageSliderTokens';

type SliderLayout = typeof t & ReturnType<typeof lightSliderLayout>;

function createSliderStyles(m: SliderLayout) {
  return StyleSheet.create({
    wrapper: {
      gap: m.sliderStatusToTrackGap,
      marginBottom: t.sliderStackMarginBottom,
    },
    statusRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: m.statusRowGap,
      minHeight: t.statusRowMinHeight,
      paddingBottom: m.sliderStatusToTrackVisualInset,
    },
    statusLeft: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      gap: t.labelPrefixGap,
      minWidth: 0,
    },
    labelPrefix: {
      fontSize: m.labelSmFontSize,
      lineHeight: m.labelSmLineHeight,
      fontWeight: m.labelWeightRegular,
    },
    labelValue: {
      fontSize: m.labelSmFontSize,
      lineHeight: m.labelSmLineHeight,
      fontWeight: m.labelWeightEmphasis,
    },
    maxLink: {
      fontSize: m.labelSmFontSize,
      lineHeight: m.labelSmLineHeight,
      fontWeight: m.labelWeightRegular,
    },
    /**
     * Wraps the track; height follows the bar. `marginTop: hCollapsed − height` keeps the slot’s
     * bottom edge fixed so the bar grows upward when pressed instead of shifting the stack down.
     */
    trackSlot: {
      width: '100%',
      overflow: 'visible',
    },
    slideOuter: {
      borderWidth: m.sliderTrackBorderWidth,
      overflow: 'visible',
      position: 'relative',
      width: '100%',
    },
    /** Clips track fills; `borderRadius` is driven by `trackChromeBorderRadiusAnim` (synced to track height). */
    trackFillClip: {
      overflow: 'hidden',
    },
    draggingFill: {
      position: 'absolute',
      left: 0,
      top: 0,
      bottom: 0,
    },
    tickRow: {
      ...StyleSheet.absoluteFill,
    },
    tick: {},
    pill: {
      alignSelf: 'center',
      maxWidth: '100%',
    },
    pillText: {
      fontWeight: m.pillTextWeight,
      textAlign: 'center',
    },
    ruler: {},
  });
}

interface Props {
  value?: number;
  onChange?: (value: number) => void;
  /** Left label before the percentage (e.g. `"Swap "`). */
  labelPrefix?: string;
  /** Right-side control label (e.g. Max). */
  maxLabel?: string;
  onMaxPress?: () => void;
}

function snapToNearest(pct: number, trackWidthPx: number): number {
  if (trackWidthPx <= 0) return pct;
  const nearest = [...t.snapPoints].reduce((prev, curr) =>
    Math.abs(curr - pct) < Math.abs(prev - pct) ? curr : prev,
  );
  const pxSlackAsPct = (t.snapSlackTrackPx / trackWidthPx) * 100;
  const slackPct = Math.max(t.snapThresholdPx, pxSlackAsPct);
  return Math.abs(nearest - pct) <= slackPct ? nearest : pct;
}

function interpolateThumbLeft(
  animatedValue: Animated.Value,
  W: number,
  clusterW: number,
  endPct: number,
  eps: number,
): Animated.AnimatedInterpolation<number> {
  if (W <= 0) {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0],
    });
  }
  const maxL = Math.max(0, W - clusterW);
  /** Ruler centered in cluster width so its center matches tick math at 25/50/75. */
  const anchorX = clusterW / 2;
  const p0 = endPct / 100;
  const denom = 1 - 2 * p0;

  if (Math.abs(denom) < eps) {
    return animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, maxL],
      extrapolate: 'clamp',
    });
  }

  const raw = (f: number) => W * (p0 + f * denom) - anchorX;
  const g0 = raw(0);
  const g1 = raw(1);
  const lowerBound = Math.min(0, g0);
  const out0 = Math.max(lowerBound, Math.min(maxL, g0));
  /** Do not clamp `g1` to `maxL`: that plateaued the handle around ~(1 − clusterW/2W) (≈90%) while value went to 100%. */
  const out1 = Math.max(lowerBound, g1);

  return animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [out0, out1],
    extrapolate: 'clamp',
  });
}

export function PercentageSlider({
  value: initial = 0,
  onChange,
  labelPrefix = '',
  maxLabel = 'Max',
  onMaxPress,
}: Props) {
  const { colors, themeId } = useTheme();
  const { width: windowWidth } = useWindowDimensions();
  const [trackWidth, setTrackWidth] = useState(0);

  const m = useMemo((): SliderLayout => {
    if (themeId === 'light') {
      return { ...t, ...lightSliderLayout(windowWidth) } as SliderLayout;
    }
    return { ...t, scale: t.layoutScaleDefault } as SliderLayout;
  }, [themeId, windowWidth]);

  const [dragging, setDragging] = useState(false);
  const draggingRef = useRef(false);
  const setDraggingTracked = useRef((next: boolean) => {
    draggingRef.current = next;
    setDragging(next);
  }).current;
  const [livePct, setLivePct] = useState(initial);
  const initialRef = useRef(initial);
  initialRef.current = initial;

  const trackHeightAnim = useRef(
    new Animated.Value(t.sliderTrackHeightCollapsed),
  ).current;

  /** Split track + primary chrome (active fill at >0% or while dragging; both themes). */
  const showActiveChrome = useMemo(
    () => dragging || Math.round(livePct) > 0,
    [dragging, livePct],
  );

  const styles = useMemo(() => createSliderStyles(m as SliderLayout), [m]);

  const headerOpacity = useRef(new Animated.Value(1)).current;
  const pillOpacity = useRef(new Animated.Value(0)).current;
  const pillTranslateY = useRef(
    new Animated.Value(t.pillDragRestTranslateY + t.pillHiddenOffsetY),
  ).current;

  useEffect(() => {
    Animated.timing(headerOpacity, {
      toValue: dragging ? 0 : 1,
      duration: dragging ? t.statusHeaderFadeOutMs : t.statusHeaderFadeInMs,
      useNativeDriver: true,
    }).start();
  }, [dragging, headerOpacity]);

  useEffect(() => {
    const toH = dragging
      ? m.sliderContainerHeight
      : m.sliderTrackHeightCollapsed;
    Animated.spring(trackHeightAnim, {
      toValue: toH,
      useNativeDriver: false,
      speed: m.sliderTrackHeightSpring.speed,
      bounciness: m.sliderTrackHeightSpring.bounciness,
    }).start();
  }, [
    dragging,
    m.sliderContainerHeight,
    m.sliderTrackHeightCollapsed,
    m.sliderTrackHeightSpring.bounciness,
    m.sliderTrackHeightSpring.speed,
    trackHeightAnim,
  ]);

  useEffect(() => {
    const duration = dragging ? t.pillAnimateInMs : t.pillAnimateOutMs;
    const easing = dragging
      ? Easing.out(Easing.cubic)
      : Easing.in(Easing.cubic);
    Animated.parallel([
      Animated.timing(pillOpacity, {
        toValue: dragging ? 1 : 0,
        duration,
        easing,
        useNativeDriver: false,
      }),
      Animated.timing(pillTranslateY, {
        toValue: dragging
          ? t.pillDragRestTranslateY + t.pillOnPressExtraTranslateY
          : t.pillDragRestTranslateY + t.pillHiddenOffsetY,
        duration,
        easing,
        useNativeDriver: false,
      }),
    ]).start();
  }, [dragging, pillOpacity, pillTranslateY]);

  const hCollapsed = m.sliderTrackHeightCollapsed;
  const hExpanded = m.sliderContainerHeight;
  const heightOk = hExpanded > hCollapsed + 0.5;

  const thumbChromeScale = useMemo(
    () =>
      heightOk
        ? trackHeightAnim.interpolate({
            inputRange: [hCollapsed, hExpanded],
            outputRange: [hCollapsed / hExpanded, 1],
            extrapolate: 'clamp',
          })
        : trackHeightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 1],
          }),
    [heightOk, hCollapsed, hExpanded, trackHeightAnim],
  );

  const rulerHeightAnim = useMemo(
    () =>
      heightOk
        ? trackHeightAnim.interpolate({
            inputRange: [hCollapsed, hExpanded],
            outputRange: [
              (m.rulerHeight * hCollapsed) / hExpanded,
              m.rulerHeight,
            ],
            extrapolate: 'clamp',
          })
        : trackHeightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [m.rulerHeight, m.rulerHeight],
          }),
    [heightOk, hCollapsed, hExpanded, m.rulerHeight, trackHeightAnim],
  );

  /** Same driver as height spring — avoids radius snapping on `dragging` while height is mid-flight. */
  const trackChromeBorderRadiusAnim = useMemo(
    () =>
      heightOk
        ? trackHeightAnim.interpolate({
            inputRange: [hCollapsed, hExpanded],
            outputRange: [
              m.sliderContainerRadiusOnPress,
              m.sliderContainerRadius,
            ],
            extrapolate: 'clamp',
          })
        : trackHeightAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [
              m.sliderContainerRadiusOnPress,
              m.sliderContainerRadius,
            ],
          }),
    [
      heightOk,
      hCollapsed,
      hExpanded,
      m.sliderContainerRadius,
      m.sliderContainerRadiusOnPress,
      trackHeightAnim,
    ],
  );

  const palette = useMemo(
    () =>
      StyleSheet.create({
        slideOuter: {
          backgroundColor: colors.sliderContainerBg,
          borderColor: colors.sliderContainerBorder,
        },
        inactiveUniform: {
          backgroundColor: colors.sliderInactiveUniform,
          borderRadius: m.sliderContainerRadius,
          overflow: 'hidden',
        },
        trackBase: {
          backgroundColor: colors.sliderTrackBase,
          borderRadius: m.sliderContainerRadius,
          overflow: 'hidden',
        },
        draggingFill: {
          backgroundColor: colors.sliderDraggingFill,
          borderRightWidth: 1,
          borderRightColor: colors.sliderDraggingFillBorder,
          borderRadius: m.sliderContainerRadius,
          overflow: 'hidden',
        },
        rulerInactive: {
          backgroundColor: colors.sliderRulerInactive,
        },
        rulerActive: {
          backgroundColor: colors.sliderRulerActive,
        },
        pillSecondary: {
          backgroundColor: colors.sliderPillSecondaryBg,
        },
        pillSecondaryText: {
          color: colors.sliderPillSecondaryText,
        },
        pillPrimary: {
          backgroundColor: colors.sliderFill,
        },
        pillPrimaryText: {
          color: colors.sliderPillPrimaryText,
        },
        maxLink: {
          color: colors.accent,
        },
      }),
    [colors, m.sliderContainerRadius],
  );

  /** `Animated.View` — typed loosely so `measure` is available on the native node. */
  const trackRef = useRef<View | null>(null);
  const trackWidthRef = useRef(0);
  const trackPageXRef = useRef(0);
  /**
   * Monotonic token bumped on **grant** and on **end** so each async `measure` only applies if it still
   * matches the current interaction (avoids stale callbacks on rapid taps and grant/release collisions).
   */
  const layoutTokenRef = useRef(0);
  /** Prevents `release` + `terminate` from both bumping the token and dropping the only `update` call. */
  const gestureEndedRef = useRef(false);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const animatedValue = useRef(new Animated.Value(initial / 100)).current;
  const maxAnimListenerIdRef = useRef<string | null>(null);
  /** While Max spring runs, parent already has 100% — skip sync effect so we don't snap `animatedValue` mid-spring. */
  const maxSpringActiveRef = useRef(false);

  const clearMaxAnimListener = () => {
    if (maxAnimListenerIdRef.current !== null) {
      animatedValue.removeListener(maxAnimListenerIdRef.current);
      maxAnimListenerIdRef.current = null;
    }
  };

  const handleMaxPress = useCallback(() => {
    if (!onChangeRef.current) {
      onMaxPress?.();
      return;
    }
    clearMaxAnimListener();
    animatedValue.stopAnimation(current => {
      const target = 1;
      if (Math.abs(current - target) < 1e-3) {
        setLivePct(100);
        onChangeRef.current?.(100);
        onMaxPress?.();
        return;
      }
      maxSpringActiveRef.current = true;
      onChangeRef.current?.(100);
      setLivePct(100);
      Animated.spring(animatedValue, {
        toValue: target,
        useNativeDriver: false,
        speed: t.spring.onRelease.speed,
        bounciness: t.spring.onRelease.bounciness,
      }).start(({ finished }) => {
        if (finished) {
          setLivePct(100);
          animatedValue.setValue(1);
          onMaxPress?.();
        } else {
          const v = initialRef.current;
          setLivePct(v);
          animatedValue.setValue(v / 100);
        }
        maxSpringActiveRef.current = false;
      });
    });
  }, [animatedValue, onMaxPress]);

  /** Sync controlled `value` from parent. Do not depend on `dragging`: when it goes false, `initial` can still be one frame behind `onChange`, which would overwrite the gesture result. */
  useEffect(() => {
    if (draggingRef.current) {
      return;
    }
    if (maxSpringActiveRef.current) {
      return;
    }
    setLivePct(initial);
    animatedValue.setValue(initial / 100);
  }, [initial, animatedValue]);

  const update = useRef((screenX: number, release: boolean) => {
    const tw = trackWidthRef.current;
    if (tw === 0) return;
    clearMaxAnimListener();
    maxSpringActiveRef.current = false;
    const x = screenX - trackPageXRef.current;
    const pct = Math.max(0, Math.min(100, (x / tw) * 100));
    const next = release ? snapToNearest(pct, tw) : pct;
    setLivePct(next);
    const spring = release ? t.spring.onRelease : t.spring.whileDragging;
    Animated.spring(animatedValue, {
      toValue: next / 100,
      useNativeDriver: false,
      speed: spring.speed,
      bounciness: spring.bounciness,
    }).start();
    onChangeRef.current?.(Math.round(next));
  }).current;

  const finalizePanRef = useRef(
    (_e: GestureResponderEvent, _gs: PanResponderGestureState) => {},
  );

  finalizePanRef.current = (
    e: GestureResponderEvent,
    gestureState: PanResponderGestureState,
  ) => {
    if (gestureEndedRef.current) {
      setDraggingTracked(false);
      return;
    }
    gestureEndedRef.current = true;
    const endToken = ++layoutTokenRef.current;
    const pageXNative = e.nativeEvent?.pageX;
    const screenX =
      typeof pageXNative === 'number' && Number.isFinite(pageXNative)
        ? pageXNative
        : (gestureState.moveX ?? gestureState.x0);
    const node = trackRef.current;
    if (!node) {
      update(screenX, true);
      setDraggingTracked(false);
      return;
    }
    node.measure(
      (_x: number, _y: number, _w: number, _h: number, pageX: number) => {
        if (layoutTokenRef.current !== endToken) {
          return;
        }
        trackPageXRef.current = pageX;
        update(screenX, true);
        setDraggingTracked(false);
      },
    );
  };

  const pan = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (_, gestureState) => {
        gestureEndedRef.current = false;
        clearMaxAnimListener();
        maxSpringActiveRef.current = false;
        const grantToken = ++layoutTokenRef.current;
        setDraggingTracked(true);
        trackRef.current?.measure(
          (_x: number, _y: number, _w: number, _h: number, pageX: number) => {
            if (layoutTokenRef.current !== grantToken) {
              return;
            }
            trackPageXRef.current = pageX;
            update(gestureState.x0, false);
          },
        );
      },
      onPanResponderMove: (_, gestureState) => {
        update(gestureState.moveX, false);
      },
      onPanResponderRelease: (e, gestureState) => {
        finalizePanRef.current(e, gestureState);
      },
      onPanResponderTerminate: (e, gestureState) => {
        finalizePanRef.current(e, gestureState);
      },
    }),
  ).current;

  const thumbLeft = useMemo(
    () =>
      interpolateThumbLeft(
        animatedValue,
        trackWidth,
        m.rulerClusterWidth,
        m.thumbCenterEndPct,
        m.thumbInterpolateEpsilon,
      ),
    [
      animatedValue,
      trackWidth,
      m.rulerClusterWidth,
      m.thumbCenterEndPct,
      m.thumbInterpolateEpsilon,
    ],
  );

  const fillWidth = useMemo(
    () =>
      animatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Math.max(0, trackWidth)],
      }),
    [animatedValue, trackWidth],
  );

  const displayPct = Math.round(livePct);

  /** Thumb rail: width + right padding; children are absolutely positioned so a hidden pill does not steal flex height. */
  const thumbClusterColumnBox = useMemo(
    () => ({
      width: m.rulerClusterWidth,
      paddingRight: m.rulerColumnPaddingRight,
    }),
    [m.rulerClusterWidth, m.rulerColumnPaddingRight],
  );

  const halfMultRef = useRef(new Animated.Value(0.5)).current;
  const negHalfMultRef = useRef(new Animated.Value(-0.5)).current;

  const trackHalfAnim = useMemo(
    () => Animated.multiply(trackHeightAnim, halfMultRef),
    [halfMultRef, trackHeightAnim],
  );

  const rulerHalfAnim = useMemo(
    () => Animated.multiply(rulerHeightAnim, halfMultRef),
    [halfMultRef, rulerHeightAnim],
  );

  /** Centers ruler vertically in the track (`top: 50%` + negative half height). */
  const rulerMarginTopAnim = useMemo(
    () => Animated.multiply(rulerHeightAnim, negHalfMultRef),
    [negHalfMultRef, rulerHeightAnim],
  );

  /** Distance from track bottom to pill bottom: H/2 + rulerH/2 + gap (pill sits above ruler). */
  const pillBottomAnim = useMemo(() => {
    const gapAnim = new Animated.Value(m.gapPillToRuler);
    return Animated.add(Animated.add(trackHalfAnim, rulerHalfAnim), gapAnim);
  }, [m.gapPillToRuler, rulerHalfAnim, trackHalfAnim]);

  const thumbRailStyle = useMemo(
    () => ({
      position: 'absolute' as const,
      top: 0,
      bottom: 0,
      alignItems: 'center' as const,
      zIndex: m.trackRulerLayerZ,
      elevation: m.trackRulerLayerElevation,
    }),
    [m.trackRulerLayerZ, m.trackRulerLayerElevation],
  );

  const trackOverlayZ = useMemo(
    () => ({
      zIndex: m.trackFillLayerZ,
      elevation: m.trackFillLayerElevation,
    }),
    [m.trackFillLayerZ, m.trackFillLayerElevation],
  );

  const trackSlotAnchorCollapsedRef = useRef(
    new Animated.Value(m.sliderTrackHeightCollapsed),
  ).current;

  useEffect(() => {
    trackSlotAnchorCollapsedRef.setValue(m.sliderTrackHeightCollapsed);
  }, [m.sliderTrackHeightCollapsed, trackSlotAnchorCollapsedRef]);

  const trackSlotMarginTopAnim = useMemo(
    () => Animated.subtract(trackSlotAnchorCollapsedRef, trackHeightAnim),
    [trackHeightAnim, trackSlotAnchorCollapsedRef],
  );

  return (
    <View style={styles.wrapper}>
      <Animated.View
        style={[styles.statusRow, { opacity: headerOpacity }]}
        pointerEvents={dragging ? 'none' : 'auto'}
      >
        <View style={styles.statusLeft}>
          {labelPrefix ? (
            <Text
              style={[styles.labelPrefix, { color: colors.textPrimary }]}
              numberOfLines={1}
            >
              {labelPrefix}
            </Text>
          ) : null}
          <Text style={[styles.labelValue, { color: colors.accent }]} numberOfLines={1}>
            {displayPct}%
          </Text>
        </View>
        {onChange || onMaxPress ? (
          <TouchableOpacity
            onPress={handleMaxPress}
            hitSlop={{
              top: t.maxLinkHitSlop,
              bottom: t.maxLinkHitSlop,
              left: t.maxLinkHitSlop,
              right: t.maxLinkHitSlop,
            }}
            accessibilityRole="button"
            accessibilityLabel={maxLabel}
          >
            <Text style={[styles.maxLink, palette.maxLink]}>{maxLabel}</Text>
          </TouchableOpacity>
        ) : (
          <Text style={[styles.maxLink, palette.maxLink]}>{maxLabel}</Text>
        )}
      </Animated.View>

      <Animated.View
        style={[
          styles.trackSlot,
          { height: trackHeightAnim, marginTop: trackSlotMarginTopAnim },
        ]}
      >
        <Animated.View
          ref={trackRef as React.RefObject<View>}
          style={[
            styles.slideOuter,
            palette.slideOuter,
            { height: trackHeightAnim, borderRadius: trackChromeBorderRadiusAnim },
          ]}
          onLayout={(e: LayoutChangeEvent) => {
            const w = e.nativeEvent.layout.width;
            trackWidthRef.current = w;
            setTrackWidth(w);
          }}
          {...pan.panHandlers}
        >
        <Animated.View
          pointerEvents="none"
          style={[thumbRailStyle, thumbClusterColumnBox, { left: thumbLeft }]}
        >
          <Animated.View
            style={[
              styles.ruler,
              showActiveChrome ? palette.rulerActive : palette.rulerInactive,
              {
                position: 'absolute',
                top: '50%',
                marginTop: rulerMarginTopAnim,
                alignSelf: 'center',
                width: m.rulerWidth,
                height: rulerHeightAnim,
                borderRadius: m.rulerBorderRadius,
              },
            ]}
          />
          <Animated.View
            pointerEvents="none"
            style={{
              position: 'absolute',
              bottom: pillBottomAnim,
              alignSelf: 'center',
              opacity: pillOpacity,
              transform: [
                { translateY: pillTranslateY },
                { scale: thumbChromeScale },
              ],
            }}
          >
            <View
              style={[
                styles.pill,
                showActiveChrome ? palette.pillPrimary : palette.pillSecondary,
                {
                  paddingVertical: t.pillPaddingY,
                  paddingHorizontal: t.pillPaddingX,
                  borderRadius: t.pillBorderRadius,
                },
              ]}
            >
              <Text
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={t.pillTextMinimumFontScale}
                style={[
                  styles.pillText,
                  showActiveChrome ? palette.pillPrimaryText : palette.pillSecondaryText,
                  {
                    fontSize: t.bodyXsFontSize,
                    lineHeight: t.bodyXsLineHeight,
                    maxWidth: '100%',
                  },
                ]}
              >
                {displayPct}%
              </Text>
            </View>
          </Animated.View>
        </Animated.View>

        <Animated.View
          pointerEvents="box-none"
          style={[
            StyleSheet.absoluteFill,
            trackOverlayZ,
            styles.trackFillClip,
            { borderRadius: trackChromeBorderRadiusAnim },
          ]}
        >
          {!showActiveChrome ? (
            <View style={[StyleSheet.absoluteFill, palette.inactiveUniform]} />
          ) : (
            <>
              <View style={[StyleSheet.absoluteFill, palette.trackBase]} />
              <Animated.View
                style={[
                  styles.draggingFill,
                  palette.draggingFill,
                  { width: fillWidth },
                ]}
              />
            </>
          )}

          <View style={styles.tickRow} pointerEvents="none">
            {t.tickPercents.map(pct => {
              const onFill = showActiveChrome && livePct > pct;
              const half = t.tickSize / 2;
              const left =
                trackWidth > 0 ? (pct / 100) * trackWidth - half : 0;
              return (
                <View
                  key={pct}
                  style={[
                    styles.tick,
                    {
                      position: 'absolute',
                      left,
                      top: '50%',
                      marginTop: -t.tickSize / 2,
                      width: t.tickSize,
                      height: t.tickSize,
                      borderRadius: t.tickBorderRadius,
                      backgroundColor: onFill
                        ? colors.sliderTickOnFill
                        : colors.sliderTickMuted,
                    },
                  ]}
                />
              );
            })}
          </View>
        </Animated.View>

        </Animated.View>
      </Animated.View>
    </View>
  );
}
