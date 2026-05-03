import type { ThemeColors } from '../colors.types';
import { darkVariables as tokens } from './variables';

const V = tokens as Record<keyof typeof tokens, string>;

function c(key: keyof typeof tokens): string {
  return V[key];
}

// -----------------------------------------------------------------------------
// App palette — maps token keys to `ThemeColors` (dark).
// Order mirrors `colors.types.ts`.
// -----------------------------------------------------------------------------

const screen = {
  background: c('surface/bg-low'),
  surface: c('component/Slider/bg-container'),
  border: c('border/default'),
} as const satisfies Pick<ThemeColors, 'background' | 'surface' | 'border'>;

const labels = {
  textPrimary: c('text/default'),
  textSecondary: c('component/Slider/ruler/ruler-inactive'),
  accent: c('text/brand'),
} as const satisfies Pick<ThemeColors, 'textPrimary' | 'textSecondary' | 'accent'>;

const sliderControls = {
  sliderRail: c('component/Slider/dots'),
  sliderFill: c('component/button/primary/bg-start'),
  sliderDot: c('component/Slider/dots'),
  sliderThumbBg: '#1a1824',
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

const buttons = {
  ghostButtonLabel: c('component/Slider/ruler/ruler-inactive'),
  primaryButtonLabel: c('component/button/primary/text'),
} as const satisfies Pick<ThemeColors, 'ghostButtonLabel' | 'primaryButtonLabel'>;

const percentageSlider = {
  sliderContainerBg: c('component/Slider/bg-container'),
  sliderContainerBorder: c('component/Slider/border-container'),
  sliderTrackBase: c('component/Slider/bg-slider-track-rail'),
  sliderInactiveUniform: c('component/Slider/bg-slider-inactive'),
  sliderDraggingFill: c('component/Slider/bg-slider-active'),
  sliderDraggingFillBorder: c('component/Slider/border-active'),
  sliderRulerInactive: c('component/Slider/ruler/ruler-active'),
  sliderRulerActive: c('component/Slider/ruler/ruler-active'),
  sliderPillSecondaryBg: c('component/Slider/bg-slider-inactive'),
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

export const darkColors: ThemeColors = {
  ...screen,
  ...labels,
  ...sliderControls,
  ...buttons,
  ...percentageSlider,
};
