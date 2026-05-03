/**
 * Light theme responsive layout — scales slider spacing from reference width (343).
 */
import { lightVariables } from './variables';

const refW = parseFloat(lightVariables['layout/reference-width']) || 343;

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
  const w = Math.max(280, Math.min(screenWidth, 560));
  const scale = w / refW;

  const tickBase = 72;
  /** Room for pill label on one line after column padding — keep in sync with tokens. */
  const clusterBase = 64;

  // --- From tokens (numbers) ---
  const fromTokens = {
    sliderContainerHeight:
      parseFloat(lightVariables['component/slider/height-active']) || 40,
    sliderContainerRadius:
      parseFloat(lightVariables['component/slider/slider-radius']) || 999,
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
      Math.min(tickBase * 1.1, Math.max(12, w * (tickBase / refW))),
    ),
    rulerClusterWidth: Math.round(clusterBase * Math.min(1.08, Math.max(0.92, scale))),
    ...fromTokens,
    rulerWidth: 3,
    rulerBorderRadius: 10,
    statusRowGap: Math.round(8 * Math.min(1.05, scale)),
    gapPillToRuler: Math.round(12 * Math.min(1.05, scale)),
    rulerPaddingBottom: 5,
    scale,
  };
}
