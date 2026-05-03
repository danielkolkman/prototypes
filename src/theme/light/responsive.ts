/**
 * Light theme responsive layout — scales slider spacing from reference width (343).
 */
import { lightVariables } from './variables';

const refW = parseFloat(lightVariables['layout/reference-width']) || 343;

export interface LightSliderLayout {
  tickMarksPaddingX: number;
  rulerClusterWidth: number;
  sliderContainerHeight: number;
  sliderContainerRadius: number;
  sliderContainerRadiusOnPress: number;
  rulerWidth: number;
  rulerHeight: number;
  rulerBorderRadius: number;
  wrapperGap: number;
  sliderStatusToTrackGap: number;
  sliderStatusToTrackVisualInset: number;
  statusRowGap: number;
  gapPillToRuler: number;
  rulerColumnPaddingRight: number;
  rulerPaddingTop: number;
  rulerPaddingBottom: number;
  scale: number;
}

export function lightSliderLayout(screenWidth: number): LightSliderLayout {
  const w = Math.max(280, Math.min(screenWidth, 560));
  const scale = w / refW;

  const tickBase = 72;
  /** Keep in sync with tokens: room for pill label on one line after column padding. */
  const clusterBase = 64;

  return {
    tickMarksPaddingX: Math.round(
      Math.min(tickBase * 1.1, Math.max(12, w * (tickBase / refW))),
    ),
    rulerClusterWidth: Math.round(clusterBase * Math.min(1.08, Math.max(0.92, scale))),
    sliderContainerHeight:
      parseFloat(lightVariables['component/slider/height-active']) || 40,
    sliderContainerRadius:
      parseFloat(lightVariables['component/slider/slider-radius']) || 999,
    sliderContainerRadiusOnPress: parseFloat(
      lightVariables['component/slider/slider-radius-pressed'],
    ) || 8,
    rulerWidth: 3,
    rulerHeight: parseFloat(lightVariables['component/slider/ruler-height']) || 28,
    rulerBorderRadius: 10,
    wrapperGap: parseFloat(lightVariables['component/slider/wrapper-gap']) || 4,
    sliderStatusToTrackGap: parseFloat(
      lightVariables['component/slider/status-to-track-gap'],
    ) || 8,
    sliderStatusToTrackVisualInset: parseFloat(
      lightVariables['component/slider/status-to-track-visual-inset'],
    ) || 0,
    statusRowGap: Math.round(8 * Math.min(1.05, scale)),
    gapPillToRuler: Math.round(12 * Math.min(1.05, scale)),
    rulerColumnPaddingRight:
      parseFloat(lightVariables['component/slider/ruler-padding-x']) || 12,
    rulerPaddingTop:
      parseFloat(lightVariables['component/slider/ruler-padding-y']) || 2,
    rulerPaddingBottom: 5,
    scale,
  };
}
