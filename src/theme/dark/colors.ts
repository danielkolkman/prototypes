import type { ThemeColors } from '../colors.types';
import { darkVariables as tokens } from './variables';

const V = tokens as Record<keyof typeof tokens, string>;

function c(key: keyof typeof tokens): string {
  return V[key];
}

/** App palette for the dark theme. */
export const darkColors: ThemeColors = {
  background: c('surface/bg-low'),
  surface: c('component/Slider/bg-container'),
  border: c('border/default'),
  textPrimary: c('text/default'),
  textSecondary: c('component/Slider/ruler/ruler-inactive'),
  accent: c('text/brand'),
  sliderRail: c('component/Slider/dots'),
  sliderFill: c('component/button/primary/bg-start'),
  sliderDot: c('component/Slider/dots'),
  sliderThumbBg: '#1a1824',
  sliderThumbBorder: c('component/button/primary/bg-start'),
  sliderThumbShadow: c('effect/shadow'),
  ghostButtonLabel: c('component/Slider/ruler/ruler-inactive'),
  primaryButtonLabel: c('component/button/primary/text'),

  sliderContainerBg: c('component/Slider/bg-container'),
  sliderContainerBorder: c('component/Slider/border-container'),
  sliderTrackBase: c('component/Slider/bg-slider-track-rail'),
  sliderInactiveUniform: c('component/Slider/bg-slider-inactive'),
  sliderDraggingFill: c('component/Slider/bg-slider-active'),
  sliderDraggingFillBorder: c('component/Slider/border-active'),
  sliderRulerInactive: c('component/Slider/ruler/ruler-inactive'),
  sliderRulerActive: c('component/Slider/ruler/ruler-active'),
  sliderPillSecondaryBg: c('component/Slider/bg-slider-inactive'),
  sliderPillSecondaryText: c('text/brand'),
  sliderPillPrimaryText: c('component/button/primary/text'),
  sliderTickMuted: c('component/Slider/dots'),
  sliderTickOnFill: c('component/Slider/tick-on-fill'),
};
