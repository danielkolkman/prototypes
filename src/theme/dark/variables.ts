/**
 * Dark theme — semantic tokens (curated dark UI).
 * Sections mirror `light/variables.ts` so you can diff themes side by side.
 */

// -----------------------------------------------------------------------------
// Text
// -----------------------------------------------------------------------------
const text = {
  'text/default': '#f2efff',
  'text/brand': '#b794f6',
  'text/label/sm/font-size': '14',
  'text/label/sm/line-height': '14',
  'text/Font-weight-medium': '600',
  'text/body/xs/font-size': '13',
  'text/body/xs/line-height': '20',
} as const;

// -----------------------------------------------------------------------------
// Typography (shared keys with light)
// -----------------------------------------------------------------------------
const typography = {
  'Font/Font-Family': 'Bitvavo Sans Variable',
  'Weight/medium': '500',
} as const;

// -----------------------------------------------------------------------------
// Buttons
// -----------------------------------------------------------------------------
const button = {
  'component/button/link/text': '#b794f6',
  'component/button/primary/bg-start': '#9e4ed9',
  'component/button/primary/text': '#ffffff',
  'component/button/xs/padding-x': '16',
  'component/button/xs/padding-y': '4',
  'component/button/xs/container-height': '28',
  'component/button/xs/radius-round': '100',
  'component/button/sm/gap': '4',
} as const;

// -----------------------------------------------------------------------------
// Slider — fills, borders, ruler (Figma `component/Slider/*`)
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Slider — layout & motion (`component/slider/*`, lowercase path)
// -----------------------------------------------------------------------------
const sliderLayout = {
  'component/slider/slider-radius': '999',
  'component/slider/ruler-height': '8',
  'component/slider/ruler-padding-y': '0',
  'component/slider/ruler-padding-x': '12',
  'component/slider/wrapper-gap': '4',
  'component/slider/height-inactive': '16',
  'component/slider/height-active': '16',
} as const;

// -----------------------------------------------------------------------------
// Links, steps
// -----------------------------------------------------------------------------
const linksAndSteps = {
  'component/link/sm/gap': '4',
  'component/link/md/container-height': '20',
  'component/step/gap': '4',
} as const;

// -----------------------------------------------------------------------------
// Surfaces & effects
// -----------------------------------------------------------------------------
const surface = {
  'surface/bg-low': '#0e0c12',
  'surface/bg': '#000000',
  'border/default': '#2a2536',
  'effect/shadow': '#000000',
} as const;

// -----------------------------------------------------------------------------
// Dark-only / legacy keys (keep names for consumers)
// -----------------------------------------------------------------------------
const misc = {
  'custom/slider/inactive-container-border': '#2d2840',
  '16': '16',
} as const;

export const darkVariables = {
  ...text,
  ...typography,
  ...button,
  ...sliderChrome,
  ...sliderLayout,
  ...linksAndSteps,
  ...surface,
  ...misc,
} as const;

export type DarkVariableKey = keyof typeof darkVariables;
