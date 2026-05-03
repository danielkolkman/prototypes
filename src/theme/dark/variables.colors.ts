/**
 * Dark theme — **paint tokens** only (hex / semantic color strings).
 * Spacing and type metrics live in `variables.spacing.ts`.
 */

const text = {
  'text/default': '#f2efff',
  'text/brand': '#b794f6',
} as const;

const button = {
  'component/button/link/text': '#b794f6',
  'component/button/primary/bg-start': '#9e4ed9',
  'component/button/primary/text': '#ffffff',
} as const;

const sliderChrome = {
  'component/Slider/bg-container': '#14121c',
  'component/Slider/border-container': '#2a2536',
  'component/Slider/bg-slider-track-rail': '#262033',
  'component/Slider/bg-slider-inactive': '#1f1a2e',
  'component/Slider/bg-slider-active': '#9e4ed9',
  'component/Slider/border-active': '#c084fc',
  'component/Slider/ruler/ruler-active': '#e8ddff',
  'component/Slider/ruler/ruler-inactive': '#6b6588',
  'component/Slider/dots': '#4a4460',
  'component/Slider/tick-on-fill': '#e8ddff',
} as const;

const surface = {
  'surface/bg-low': '#0e0c12',
  'surface/bg': '#000000',
  'border/default': '#2a2536',
  'effect/shadow': '#000000',
} as const;

const misc = {
  'custom/slider/inactive-container-border': '#2d2840',
} as const;

export const darkVariableColors = {
  ...text,
  ...button,
  ...sliderChrome,
  ...surface,
  ...misc,
} as const;
