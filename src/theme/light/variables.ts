/**
 * Light theme — raw design tokens from Figma **Core Components (Tokenized)**.
 * Sections mirror `dark/variables.ts` so you can diff themes side by side.
 * @see https://www.figma.com/design/etBTFPHHkutiUBB0Gac59s/…?node-id=14806-27950&m=dev
 */
export const LIGHT_FIGMA_FILE_KEY = 'etBTFPHHkutiUBB0Gac59s';
export const LIGHT_FIGMA_NODE_ID = '14806:27950';

// -----------------------------------------------------------------------------
// Text
// -----------------------------------------------------------------------------
const text = {
  'text/default': '#383c40',
  'text/brand': '#0051ff',
  'text/label/sm/font-size': '14',
  'text/label/sm/line-height': '14',
  'text/body/xs/font-size': '13',
  'text/body/xs/line-height': '20',
} as const;

// -----------------------------------------------------------------------------
// Typography (shared keys with dark)
// -----------------------------------------------------------------------------
const typography = {
  'Font/Font-Family': 'Inter',
  'Weight/medium': '500',
} as const;

// -----------------------------------------------------------------------------
// Buttons
// -----------------------------------------------------------------------------
const button = {
  'component/button/link/text': '#0051ff',
  'component/button/primary/bg-start': '#0051ff',
  'component/button/primary/text': '#ffffff',
  'component/button/xs/padding-x': '16',
  'component/button/xs/padding-y': '4',
  'component/button/xs/radius-round': '100',
  'component/button/xs/container-height': '28',
  'component/button/sm/gap': '4',
} as const;

// -----------------------------------------------------------------------------
// Slider — fills, borders, ruler (Figma `component/Slider/*`)
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Slider — layout & motion (`component/slider/*`, lowercase path)
// -----------------------------------------------------------------------------
const sliderLayout = {
  'component/slider/slider-radius': '8',
  'component/slider/slider-radius-pressed': '8',
  'component/slider/height-active': '32',
  'component/slider/ruler-height': '28',
  'component/slider/ruler-padding-y': '2',
  'component/slider/ruler-padding-x': '12',
  'component/slider/wrapper-gap': '4',
  'component/slider/status-to-track-gap': '8',
  'component/slider/status-to-track-visual-inset': '0',
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
  'surface/bg-low': '#ffffff',
  'surface/bg': '#ffffff',
  'border/default': '#f5f5f5',
  'effect/shadow': '#000000',
} as const;

// -----------------------------------------------------------------------------
// Layout reference (responsive.ts)
// -----------------------------------------------------------------------------
const layout = {
  'layout/reference-width': '343',
} as const;

// -----------------------------------------------------------------------------
// Misc
// -----------------------------------------------------------------------------
const misc = {
  '16': '16',
} as const;

export const lightVariables = {
  ...text,
  ...typography,
  ...button,
  ...sliderChrome,
  ...sliderLayout,
  ...linksAndSteps,
  ...surface,
  ...layout,
  ...misc,
} as const;

export type LightVariableKey = keyof typeof lightVariables;
