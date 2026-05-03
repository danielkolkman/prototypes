/**
 * Light theme — raw design tokens from Figma **Core Components (Tokenized)**.
 * @see https://www.figma.com/design/etBTFPHHkutiUBB0Gac59s/…?node-id=14806-27950&m=dev
 */
export const LIGHT_FIGMA_FILE_KEY = 'etBTFPHHkutiUBB0Gac59s';
export const LIGHT_FIGMA_NODE_ID = '14806:27950';

export const lightVariables = {
  'text/default': '#383c40',
  'text/brand': '#0051ff',
  'text/label/sm/font-size': '14',
  'text/label/sm/line-height': '14',

  'component/button/link/text': '#0051ff',
  'component/button/primary/bg-start': '#0051ff',
  'component/button/primary/text': '#ffffff',
  'component/button/xs/padding-x': '16',
  'component/button/xs/padding-y': '4',
  'component/button/xs/radius-round': '100',
  'component/button/xs/container-height': '28',
  'component/button/sm/gap': '4',

  'text/body/xs/font-size': '13',
  'text/body/xs/line-height': '20',
  'Weight/medium': '500',
  'Font/Font-Family': 'Inter',

  'component/Slider/bg-container': '#ffffff',
  'component/Slider/border-container': '#dfe7ef',
  'component/Slider/bg-slider-active': '#edf6ff',
  'component/Slider/border-active': '#c8e1fc',
  'component/Slider/bg-slider-inactive': '#ffffff',
  'component/Slider/bg-slider-track-rail': '#f2f6fb',
  'component/Slider/ruler/ruler-active': '#0051ff',
  'component/Slider/ruler/ruler-inactive': '#9aa7bc',
  'component/Slider/dots': '#c8e1fc',
  'component/Slider/tick-on-fill': '#ffffff',

  'component/slider/slider-radius': '999',
  'component/slider/slider-radius-pressed': '8',
  'component/slider/height-active': '40',
  'component/slider/ruler-height': '28',
  'component/slider/ruler-padding-y': '2',
  'component/slider/ruler-padding-x': '12',
  'component/slider/wrapper-gap': '4',
  'component/slider/status-to-track-gap': '8',
  'component/slider/status-to-track-visual-inset': '0',
  'component/step/gap': '4',
  'component/link/sm/gap': '4',
  'component/link/md/container-height': '20',

  'surface/bg-low': '#ffffff',
  'border/default': '#f5f5f5',

  'effect/shadow': '#000000',

  'layout/reference-width': '343',

  '16': '16',
} as const;

export type LightVariableKey = keyof typeof lightVariables;
