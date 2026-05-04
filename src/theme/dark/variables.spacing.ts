/**
 * Dark theme — **spacing, sizing, and type metrics** (numeric strings).
 * Color strings live in `variables.colors.ts`.
 */

const textMetrics = {
  'text/label/sm/font-size': '14',
  'text/label/sm/line-height': '14',
  'text/Font-weight-medium': '600',
  'text/body/xs/font-size': '13',
  'text/body/xs/line-height': '20',
} as const;

const typography = {
  'Font/Font-Family': 'Bitvavo Sans Variable',
  'Weight/medium': '500',
} as const;

const button = {
  'component/button/xs/padding-x': '16',
  'component/button/xs/padding-y': '4',
  'component/button/xs/container-height': '28',
  'component/button/xs/radius-round': '100',
  'component/button/sm/gap': '4',
} as const;

const sliderLayout = {
  'component/slider/slider-radius': '999',
  'component/slider/ruler-height': '8',
  'component/slider/ruler-padding-y': '0',
  'component/slider/ruler-padding-x': '12',
  'component/slider/wrapper-gap': '4',
  'component/slider/height-inactive': '16',
  'component/slider/height-active': '16',
} as const;

const linksAndSteps = {
  'component/link/sm/gap': '4',
  'component/link/md/container-height': '20',
  'component/step/gap': '4',
} as const;

const misc = {
  '16': '16',
} as const;

export const darkVariableSpacing = {
  ...textMetrics,
  ...typography,
  ...button,
  ...sliderLayout,
  ...linksAndSteps,
  ...misc,
} as const;
