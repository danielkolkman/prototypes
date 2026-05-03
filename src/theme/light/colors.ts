import type { ThemeColors } from '../colors.types';
import { lightVariables as tokens } from './variables';

const V = tokens as Record<keyof typeof tokens, string>;

function c(key: keyof typeof tokens): string {
  return V[key];
}

// -----------------------------------------------------------------------------
// App palette — maps Figma-style token keys to `ThemeColors` (light).
// Order mirrors `colors.types.ts`: screen chrome → text → controls → slider.
// -----------------------------------------------------------------------------

/** Screen & cards */
const screen = {
  background: c('surface/bg-low'),
  surface: c('component/Slider/bg-container'),
  border: c('component/Slider/border-container'),
} as const satisfies Pick<ThemeColors, 'background' | 'surface' | 'border'>;

/** Typography & accent */
const labels = {
  textPrimary: c('text/default'),
  textSecondary: c('component/Slider/ruler/ruler-inactive'),
  accent: c('text/brand'),
} as const satisfies Pick<ThemeColors, 'textPrimary' | 'textSecondary' | 'accent'>;

/** Slider thumb & simple fills */
const sliderControls = {
  sliderRail: c('component/Slider/dots'),
  sliderFill: c('component/button/primary/bg-start'),
  sliderDot: c('component/Slider/dots'),
  sliderThumbBg: c('component/Slider/bg-container'),
  sliderThumbBorder: c('component/button/primary/bg-start'),
  sliderThumbShadow: c('effect/shadow'),
} as const satisfies Pick<
  ThemeColors,
  | 'sliderRail'
  | 'sliderFill'
  | 'sliderDot'
  | 'sliderThumbBg'
  | 'sliderThumbBorder'
  | 'sliderThumbShadow'
>;

/** Buttons that sit beside the slider */
const buttons = {
  ghostButtonLabel: c('component/Slider/ruler/ruler-inactive'),
  primaryButtonLabel: c('component/button/primary/text'),
} as const satisfies Pick<ThemeColors, 'ghostButtonLabel' | 'primaryButtonLabel'>;

/** Percentage slider track, ruler, pill */
const percentageSlider = {
  sliderContainerBg: c('component/Slider/bg-container'),
  sliderContainerBorder: c('component/Slider/border-container'),
  sliderTrackBase: c('component/Slider/bg-slider-track-rail'),
  sliderInactiveUniform: c('component/Slider/bg-slider-inactive'),
  sliderDraggingFill: c('component/Slider/bg-slider-active'),
  sliderDraggingFillBorder: c('component/Slider/border-active'),
  sliderRulerInactive: c('component/Slider/ruler/ruler-active'),
  sliderRulerActive: c('component/Slider/ruler/ruler-active'),
  sliderPillSecondaryBg: c('component/Slider/bg-slider-active'),
  sliderPillSecondaryText: c('text/brand'),
  sliderPillPrimaryText: c('component/button/primary/text'),
  sliderTickMuted: c('component/Slider/dots'),
  sliderTickOnFill: c('component/Slider/tick-on-fill'),
} as const satisfies Pick<
  ThemeColors,
  | 'sliderContainerBg'
  | 'sliderContainerBorder'
  | 'sliderTrackBase'
  | 'sliderInactiveUniform'
  | 'sliderDraggingFill'
  | 'sliderDraggingFillBorder'
  | 'sliderRulerInactive'
  | 'sliderRulerActive'
  | 'sliderPillSecondaryBg'
  | 'sliderPillSecondaryText'
  | 'sliderPillPrimaryText'
  | 'sliderTickMuted'
  | 'sliderTickOnFill'
>;

export const lightColors: ThemeColors = {
  ...screen,
  ...labels,
  ...sliderControls,
  ...buttons,
  ...percentageSlider,
};
