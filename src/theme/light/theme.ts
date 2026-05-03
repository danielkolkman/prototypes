/**
 * Light theme — nested semantic tokens: **colors** (paint) vs **spacing** (sizes, gaps, type metrics).
 * Raw Figma flat map remains `lightVariables` / `lightThemeFlat`.
 */
import { lightVariables as v } from './variables';

function num(key: keyof typeof v, fallback: number): number {
  const raw = v[key];
  const n = parseFloat(String(raw));
  return Number.isFinite(n) ? n : fallback;
}

// -----------------------------------------------------------------------------
// Colors — paint / semantic strings only
// -----------------------------------------------------------------------------
const colors = {
  text: {
    default: v['text/default'],
    brand: v['text/brand'],
  },
  button: {
    linkText: v['component/button/link/text'],
    primaryBg: v['component/button/primary/bg-start'],
    primaryText: v['component/button/primary/text'],
  },
  slider: {
    bgContainer: v['component/Slider/bg-container'],
    borderContainer: v['component/Slider/border-container'],
    bgSliderActive: v['component/Slider/bg-slider-active'],
    bgSliderInactive: v['component/Slider/bg-slider-inactive'],
    borderActive: v['component/Slider/border-active'],
    rulerActive: v['component/Slider/ruler/ruler-active'],
    rulerInactive: v['component/Slider/ruler/ruler-inactive'],
    dots: v['component/Slider/dots'],
    tickOnFill: v['component/Slider/tick-on-fill'],
  },
  surface: {
    bgLow: v['surface/bg-low'],
    bg: v['surface/bg'],
  },
  border: {
    default: v['border/default'],
  },
} as const;

// -----------------------------------------------------------------------------
// Spacing — layout numbers, gaps, radii, typography metrics
// -----------------------------------------------------------------------------
const spacing = {
  layout: {
    referenceWidth: num('layout/reference-width', 343),
  },
  typography: {
    fontFamily: v['Font/Font-Family'],
    weightMedium: num('Weight/medium', 500),
  },
  text: {
    labelSm: {
      fontSize: num('text/label/sm/font-size', 14),
      lineHeight: num('text/label/sm/line-height', 14),
    },
    bodyXs: {
      fontSize: num('text/body/xs/font-size', 13),
      lineHeight: num('text/body/xs/line-height', 20),
      fontWeight: num('Weight/medium', 500),
    },
  },
  button: {
    xsPaddingX: num('component/button/xs/padding-x', 16),
    xsPaddingY: num('component/button/xs/padding-y', 4),
    xsRadius: num('component/button/xs/radius-round', 100),
    smGap: num('component/button/sm/gap', 4),
    linkMinHeight: num('component/link/md/container-height', 20),
  },
  slider: {
    wrapperGap: num('component/slider/wrapper-gap', 4),
    statusToTrackGap: num('component/slider/status-to-track-gap', 8),
    statusToTrackVisualInset: num(
      'component/slider/status-to-track-visual-inset',
      0,
    ),
    stepGap: num('component/step/gap', 4),
    linkSmGap: num('component/link/sm/gap', 4),
    radius: num('component/slider/slider-radius', 8),
    radiusPressed: num('component/slider/slider-radius-pressed', 8),
    height: num('component/slider/height-active', 32),
    rulerHeight: num('component/slider/ruler-height', 28),
    rulerPaddingY: num('component/slider/ruler-padding-y', 2),
    rulerPaddingX: num('component/slider/ruler-padding-x', 12),
  },
} as const;

export const lightTheme = {
  colors,
  spacing,
} as const;

export type LightTheme = typeof lightTheme;

/** Flat CSS custom properties from the full Figma token map (`lightVariables`). */
export const lightThemeFlat: Record<string, string> = Object.fromEntries(
  Object.entries(v).map(([k, val]) => [
    `--${k.replace(/\//g, '-')}`,
    String(val),
  ]),
);
