/**
 * Light theme — **spacing, sizing, and type metrics** (numeric strings from Figma).
 * Color strings live in `variables.colors.ts`.
 */

const textMetrics = {
  'text/label/sm/font-size': '14',
  'text/label/sm/line-height': '14',
  'text/body/xs/font-size': '13',
  'text/body/xs/line-height': '20',
} as const;

const typography = {
  'Font/Font-Family': 'Inter',
  'Weight/medium': '500',
} as const;

const button = {
  'component/button/xs/padding-x': '16',
  'component/button/xs/padding-y': '4',
  'component/button/xs/radius-round': '100',
  'component/button/xs/container-height': '28',
  'component/button/sm/gap': '4',
} as const;

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

const linksAndSteps = {
  'component/link/sm/gap': '4',
  'component/link/md/container-height': '20',
  'component/step/gap': '4',
} as const;

const layout = {
  'layout/reference-width': '343',
} as const;

const misc = {
  '16': '16',
} as const;

export const lightVariableSpacing = {
  ...textMetrics,
  ...typography,
  ...button,
  ...sliderLayout,
  ...linksAndSteps,
  ...layout,
  ...misc,
} as const;
