/**
 * Light theme — **paint tokens** only (hex / semantic color strings from Figma).
 * Spacing, type metrics, and radii live in `variables.spacing.ts`.
 */

const text = {
  'text/default': '#383c40',
  'text/brand': '#0051ff',
} as const;

const button = {
  'component/button/link/text': '#0051ff',
  'component/button/primary/bg-start': '#0051ff',
  'component/button/primary/text': '#ffffff',
} as const;

const sliderChrome = {
  'component/Slider/bg-container': '#ffffff',
  'component/Slider/border-container': '#dfe7ef',
  'component/Slider/bg-slider-track-rail': '#f2f6fb',
  'component/Slider/bg-slider-inactive': '#ffffff',
  'component/Slider/bg-slider-active': '#edf6ff',
  'component/Slider/border-active': '#c8e1fc',
  'component/Slider/ruler/ruler-active': '#0051ff',
  'component/Slider/ruler/ruler-inactive': '#9aa7bc',
  'component/Slider/dots': '#c8e1fc',
  'component/Slider/tick-on-fill': '#ffffff',
} as const;

const surface = {
  'surface/bg-low': '#ffffff',
  'surface/bg': '#ffffff',
  'border/default': '#f5f5f5',
  'effect/shadow': '#000000',
} as const;

export const lightVariableColors = {
  ...text,
  ...button,
  ...sliderChrome,
  ...surface,
} as const;
