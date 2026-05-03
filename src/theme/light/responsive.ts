/**
 * Light theme **responsive layout** — `lightSliderLayout(screenWidth)` merges with
 * static `percentageSliderTokens` in `PercentageSlider`.
 *
 * Shared numeric bases and clamps live in `responsiveTokens.ts`.
 */
import {
  LIGHT_LAYOUT_MIN_WINDOW_WIDTH,
  LIGHT_LAYOUT_REFERENCE_WIDTH,
  LIGHT_RULER_BORDER_RADIUS_PX,
  LIGHT_RULER_CLUSTER_BASE_PX,
  LIGHT_RULER_CLUSTER_SCALE_MAX,
  LIGHT_RULER_CLUSTER_SCALE_MIN,
  LIGHT_RULER_PADDING_BOTTOM_PX,
  LIGHT_RULER_WIDTH_PX,
  LIGHT_TICK_MARKS_BASE_PX,
  LIGHT_TICK_MARKS_PADDING_CAP_RATIO,
  LIGHT_VERTICAL_RHYTHM_SCALE_CAP,
} from './responsiveTokens';
import { lightVariables } from './variables';

const refW =
  parseFloat(lightVariables['layout/reference-width']) ||
  LIGHT_LAYOUT_REFERENCE_WIDTH;

export interface LightSliderLayout {
  // Horizontal spacing
  tickMarksPaddingX: number;
  rulerClusterWidth: number;

  // Track capsule
  sliderContainerHeight: number;
  sliderContainerRadius: number;
  sliderContainerRadiusOnPress: number;

  // Ruler column
  rulerWidth: number;
  rulerHeight: number;
  rulerBorderRadius: number;
  rulerColumnPaddingRight: number;
  rulerPaddingTop: number;
  rulerPaddingBottom: number;

  // Vertical rhythm vs status row & pill
  wrapperGap: number;
  sliderStatusToTrackGap: number;
  sliderStatusToTrackVisualInset: number;
  statusRowGap: number;
  gapPillToRuler: number;

  /** Width scale vs Figma reference (343). */
  scale: number;
}

export function lightSliderLayout(screenWidth: number): LightSliderLayout {
  const w = Math.max(LIGHT_LAYOUT_MIN_WINDOW_WIDTH, screenWidth);
  const scale = w / refW;

  const fromTokens = {
    sliderContainerHeight:
      parseFloat(lightVariables['component/slider/height-active']) || 32,
    sliderContainerRadius:
      parseFloat(lightVariables['component/slider/slider-radius']) || 8,
    sliderContainerRadiusOnPress:
      parseFloat(lightVariables['component/slider/slider-radius-pressed']) || 8,
    rulerHeight: parseFloat(lightVariables['component/slider/ruler-height']) || 28,
    wrapperGap: parseFloat(lightVariables['component/slider/wrapper-gap']) || 4,
    sliderStatusToTrackGap:
      parseFloat(lightVariables['component/slider/status-to-track-gap']) || 8,
    sliderStatusToTrackVisualInset:
      parseFloat(lightVariables['component/slider/status-to-track-visual-inset']) ||
      0,
    rulerColumnPaddingRight:
      parseFloat(lightVariables['component/slider/ruler-padding-x']) || 12,
    rulerPaddingTop:
      parseFloat(lightVariables['component/slider/ruler-padding-y']) || 2,
  };

  return {
    tickMarksPaddingX: Math.round(
      Math.min(
        LIGHT_TICK_MARKS_BASE_PX * LIGHT_TICK_MARKS_PADDING_CAP_RATIO,
        Math.max(12, w * (LIGHT_TICK_MARKS_BASE_PX / refW)),
      ),
    ),
    rulerClusterWidth: Math.round(
      LIGHT_RULER_CLUSTER_BASE_PX *
        Math.min(LIGHT_RULER_CLUSTER_SCALE_MAX, Math.max(LIGHT_RULER_CLUSTER_SCALE_MIN, scale)),
    ),
    ...fromTokens,
    rulerWidth: LIGHT_RULER_WIDTH_PX,
    rulerBorderRadius: LIGHT_RULER_BORDER_RADIUS_PX,
    statusRowGap: Math.round(8 * Math.min(LIGHT_VERTICAL_RHYTHM_SCALE_CAP, scale)),
    gapPillToRuler: Math.round(12 * Math.min(LIGHT_VERTICAL_RHYTHM_SCALE_CAP, scale)),
    rulerPaddingBottom: LIGHT_RULER_PADDING_BOTTOM_PX,
    scale,
  };
}
