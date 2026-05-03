/**
 * Light theme — nested semantic tokens (mirrors CSS theme object shape).
 */
import { lightVariables as v } from './variables';

function num(key: keyof typeof v, fallback: number): number {
  const raw = v[key];
  const n = parseFloat(String(raw));
  return Number.isFinite(n) ? n : fallback;
}

// -----------------------------------------------------------------------------
// Text
// -----------------------------------------------------------------------------
const text = {
  default: v['text/default'],
  brand: v['text/brand'],
  labelSm: {
    fontSize: num('text/label/sm/font-size', 14),
    lineHeight: num('text/label/sm/line-height', 14),
  },
  bodyXs: {
    fontSize: num('text/body/xs/font-size', 13),
    lineHeight: num('text/body/xs/line-height', 20),
    fontWeight: num('Weight/medium', 500),
  },
  fontFamily: v['Font/Font-Family'],
} as const;

// -----------------------------------------------------------------------------
// Buttons
// -----------------------------------------------------------------------------
const button = {
  linkText: v['component/button/link/text'],
  primaryBg: v['component/button/primary/bg-start'],
  primaryText: v['component/button/primary/text'],
  xsPaddingX: num('component/button/xs/padding-x', 16),
  xsPaddingY: num('component/button/xs/padding-y', 4),
  xsRadius: num('component/button/xs/radius-round', 100),
  smGap: num('component/button/sm/gap', 4),
} as const;

// -----------------------------------------------------------------------------
// Slider — spacing & numeric layout (from `component/slider/*`)
// -----------------------------------------------------------------------------
const sliderLayout = {
  wrapperGap: num('component/slider/wrapper-gap', 4),
  statusToTrackGap: num('component/slider/status-to-track-gap', 8),
  statusToTrackVisualInset: num(
    'component/slider/status-to-track-visual-inset',
    0,
  ),
  stepGap: num('component/step/gap', 4),
  linkSmGap: num('component/link/sm/gap', 4),
  linkMinHeight: num('component/link/md/container-height', 20),
  radius: num('component/slider/slider-radius', 8),
  radiusPressed: num('component/slider/slider-radius-pressed', 8),
  height: num('component/slider/height-active', 32),
  rulerHeight: num('component/slider/ruler-height', 28),
  rulerPaddingY: num('component/slider/ruler-padding-y', 2),
  rulerPaddingX: num('component/slider/ruler-padding-x', 12),
} as const;

// -----------------------------------------------------------------------------
// Slider — fills & ruler (from `component/Slider/*`)
// -----------------------------------------------------------------------------
const sliderChrome = {
  bgContainer: v['component/Slider/bg-container'],
  borderContainer: v['component/Slider/border-container'],
  bgSliderActive: v['component/Slider/bg-slider-active'],
  bgSliderInactive: v['component/Slider/bg-slider-inactive'],
  borderActive: v['component/Slider/border-active'],
  rulerActive: v['component/Slider/ruler/ruler-active'],
  rulerInactive: v['component/Slider/ruler/ruler-active'],
  dots: v['component/Slider/dots'],
  tickOnFill: v['component/Slider/tick-on-fill'],
} as const;

const surface = {
  bgLow: v['surface/bg'],
} as const;

const border = {
  default: v['border/default'],
} as const;

const layout = {
  referenceWidth: num('layout/reference-width', 343),
} as const;

export const lightTheme = {
  text,
  button,
  slider: { ...sliderLayout, ...sliderChrome },
  surface,
  border,
  layout,
} as const;

export const lightThemeFlat: Record<string, string> = Object.fromEntries(
  Object.entries(v).map(([k, val]) => [
    `--${k.replace(/\//g, '-')}`,
    String(val),
  ]),
);
