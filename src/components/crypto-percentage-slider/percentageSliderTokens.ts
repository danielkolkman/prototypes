/**
 * Design tokens for `PercentageSlider` — layout, motion, stacking, typography,
 * snapping, and thumb geometry. **Semantic colors** live in `ThemeColors` /
 * `theme/light/colors.ts` (paint) and `theme/light/theme.ts` (`colors` vs `spacing`).
 * This module only holds numbers, weights, and motion for the slider control.
 *
 * **Responsive** sizes from the design system live in `theme/light/responsiveTokens.ts`
 * and are applied via `lightSliderLayout(screenWidth)` in `theme/light/responsive.ts`.
 *
 * The exported object stays **flat** so
 * `SliderLayout = { ...percentageSliderTokens, ...lightSliderLayout(w) }`
 * (see `PercentageSlider.tsx`) stays one merged type without nested access.
 */

// -----------------------------------------------------------------------------
// Track — outer slider chrome (height matches Figma active track)
// -----------------------------------------------------------------------------

/**
 * Expanded track height (Core Light / default chrome). Also the height of the
 * **track slot** in `PercentageSlider`: the slot is fixed at this size so the
 * track can grow upward from the bottom without shifting content below.
 */
const sliderContainerHeight = 32;
/** Outer track + fill layers (collapsed and expanded). */
const sliderContainerRadius = 8;
/** Low end of height ↔ radius animation (match expanded for constant 8pt chrome). */
const sliderContainerRadiusOnPress = 8;

/** Resting track height before drag; springs to `sliderContainerHeight` while pressed. */
const sliderTrackHeightCollapsed = 16;

// -----------------------------------------------------------------------------
// Vertical stack — space between header, track, and following content
// -----------------------------------------------------------------------------

/** Flex `gap` between status row and track slot (`PercentageSlider` wrapper). */
const sliderStatusToTrackGap = 8;

/** Extra padding below the status row label line (adds to or substitutes part of `gap` when needed). */
const sliderStatusToTrackVisualInset = 0;

/** General slider wrapper gap (Core Light merge). */
const wrapperGap = 4;

/** Bottom margin so the floating pill + ruler do not collide with the next block. */
const sliderStackMarginBottom = 36;

// -----------------------------------------------------------------------------
// Status row — “Swap 25%” line above the track
// -----------------------------------------------------------------------------

const statusRowGap = 8;
/** Keep close to label line height so the row doesn’t add extra space above the track. */
const statusRowMinHeight = 14;
const labelPrefixGap = 4;

/** Prefix + “Max” link (matches Figma label/sm). */
const labelSmFontSize = 14;
const labelSmLineHeight = 14;

/** Percentage pill above thumb (matches Figma body/xs). */
const bodyXsFontSize = 13;
const bodyXsLineHeight = 20;

// -----------------------------------------------------------------------------
// Thumb cluster — pill label + vertical ruler (positioned on thumb)
// -----------------------------------------------------------------------------

const rulerWidth = 3;
const rulerHeight = 28;
const rulerBorderRadius = 10;
const rulerPaddingTop = 2;
const rulerPaddingBottom = 5;

/** Inset from right edge of cluster; keeps ruler under thumb while pill fits. */
const rulerColumnPaddingRight = 12;

const gapPillToRuler = 12;

/**
 * Total width of the pill + ruler column. Must fit “100%” with horizontal pill
 * padding after `rulerColumnPaddingRight` is applied in layout.
 */
const rulerClusterWidth = 64;

const pillPaddingY = 4;
const pillPaddingX = 10;
/** Full pill radius (capsule). */
const pillBorderRadius = 100;

// -----------------------------------------------------------------------------
// Tick marks — snap guides inside the track (placed at % of full track width)
// -----------------------------------------------------------------------------

const tickSize = 4.5;
const tickBorderRadius = tickSize / 2;

/**
 * Horizontal inset token for legacy / Core Light responsive merge only.
 * Tick dots ignore this and span the **full** track width at `tickPercents`.
 */
const tickMarksPaddingX = 72;

/** Percent of track width where each dot is centered (quarters between 0 and 100). */
const tickPercents = [25, 50, 75] as const;

// -----------------------------------------------------------------------------
// Snapping — values used on release (`snapToNearest`)
// -----------------------------------------------------------------------------

const snapPoints = [0, 25, 50, 75, 100] as const;

/**
 * Minimum slack in **percentage points** (used with pixel slack below). Keeps quarter
 * marks easy to hit on very wide tracks where px→% is tiny.
 */
const snapThresholdPx = 8;

/**
 * Extra slack in **track pixels** on release: converted to % via track width so snapping
 * feels consistent across screen sizes (narrower track = wider % magnet).
 */
const snapSlackTrackPx = 18;

// -----------------------------------------------------------------------------
// Motion — `Animated.spring` for thumb fill
// -----------------------------------------------------------------------------

const springOnRelease = { speed: 20, bounciness: 4 };
const springWhileDragging = { speed: 100, bounciness: 0 };

/** Spring for collapsed ↔ expanded track height (`Animated.spring`). */
const sliderTrackHeightSpring = { speed: 22, bounciness: 4 };

// -----------------------------------------------------------------------------
// Stacking — pill under track fill, ruler above (z-index / elevation)
// -----------------------------------------------------------------------------

const trackPillLayerZ = 0;
const trackPillLayerElevation = 0;
const trackFillLayerZ = 1;
const trackFillLayerElevation = 1;
const trackRulerLayerZ = 2;
const trackRulerLayerElevation = 2;

// -----------------------------------------------------------------------------
// Pill — drag chip motion (translateY + opacity timings)
// -----------------------------------------------------------------------------

/**
 * Base `translateY` for pill motion. With `pillOnPressExtraTranslateY` (24) this yields **0** while
 * dragging — do not change that pair if the on-press pill height should stay fixed.
 */
const pillDragRestTranslateY = -24;

/**
 * Added to `pillDragRestTranslateY` when idle / fading out (not dragging). Smaller = pill sits
 * higher on screen. Kept separate from `pillOnPressExtraTranslateY` so only the default position moves.
 */
const pillHiddenOffsetY = 42;

/** Added to `pillDragRestTranslateY` while dragging (positive = lower on screen vs base rest). */
const pillOnPressExtraTranslateY = 24;

const pillAnimateInMs = 200;
const pillAnimateOutMs = 170;

// -----------------------------------------------------------------------------
// Status row — header fades when dragging thumb
// -----------------------------------------------------------------------------

const statusHeaderFadeOutMs = 140;
const statusHeaderFadeInMs = 220;

// -----------------------------------------------------------------------------
// Thumb geometry — ruler center vs track (see `interpolateThumbLeft`)
// -----------------------------------------------------------------------------

/**
 * Inset at 0/100 as % of track width each side (0 = ruler center tracks `value × width`, matching tick centers at 25/50/75).
 */
const thumbCenterEndPct = 0;

/** Denominator guard + thumb `interpolate` plateau detection. */
const thumbInterpolateEpsilon = 1e-6;

// -----------------------------------------------------------------------------
// Track chrome & hit targets (non-theme; theme colors stay in `ThemeColors`)
// -----------------------------------------------------------------------------

const sliderTrackBorderWidth = 1;

/** `hitSlop` for the optional Max control. */
const maxLinkHitSlop = 8;

/**
 * Vertical expansion around the track for pan gestures (`trackPanShell` padding + negative
 * margin). Horizontal touch uses the full track width (no horizontal inset).
 */
const sliderTrackHitExpansionPt = 16;

// -----------------------------------------------------------------------------
// Typography — weights (RN string weights; colors from theme in component)
// -----------------------------------------------------------------------------

const labelWeightRegular = '500';
const labelWeightEmphasis = '600';
const pillTextWeight = '500';

/** `adjustsFontSizeToFit` lower bound for pill percentage text. */
const pillTextMinimumFontScale = 0.85;

// -----------------------------------------------------------------------------
// Layout merge — `SliderLayout` includes `scale` from Core Light or this default
// -----------------------------------------------------------------------------

const layoutScaleDefault = 1;

// -----------------------------------------------------------------------------
// Public export (grouped: track → stack → status → thumb → ticks → snap →
// spring → stacking → pill motion → status motion → thumb geometry → chrome →
// type weights → pill label → layout default scale)
// -----------------------------------------------------------------------------

export const percentageSliderTokens = {
  // Track
  sliderContainerHeight,
  sliderContainerRadius,
  sliderContainerRadiusOnPress,
  sliderTrackHeightCollapsed,
  sliderTrackHeightSpring,

  // Stack
  sliderStatusToTrackGap,
  sliderStatusToTrackVisualInset,
  wrapperGap,
  sliderStackMarginBottom,

  // Status row
  statusRowGap,
  statusRowMinHeight,
  labelPrefixGap,
  labelSmFontSize,
  labelSmLineHeight,
  bodyXsFontSize,
  bodyXsLineHeight,

  // Thumb cluster
  rulerWidth,
  rulerHeight,
  rulerBorderRadius,
  rulerPaddingTop,
  rulerPaddingBottom,
  rulerColumnPaddingRight,
  gapPillToRuler,
  rulerClusterWidth,
  pillPaddingY,
  pillPaddingX,
  pillBorderRadius,

  // Ticks
  tickSize,
  tickBorderRadius,
  tickMarksPaddingX,
  tickPercents,

  // Snapping
  snapPoints,
  snapThresholdPx,
  snapSlackTrackPx,

  // Motion
  spring: {
    onRelease: springOnRelease,
    whileDragging: springWhileDragging,
  },

  // Stacking
  trackPillLayerZ,
  trackPillLayerElevation,
  trackFillLayerZ,
  trackFillLayerElevation,
  trackRulerLayerZ,
  trackRulerLayerElevation,

  // Pill motion
  pillDragRestTranslateY,
  pillHiddenOffsetY,
  pillOnPressExtraTranslateY,
  pillAnimateInMs,
  pillAnimateOutMs,

  // Status header motion
  statusHeaderFadeOutMs,
  statusHeaderFadeInMs,

  // Thumb geometry
  thumbCenterEndPct,
  thumbInterpolateEpsilon,

  // Chrome & hit targets
  sliderTrackBorderWidth,
  maxLinkHitSlop,
  sliderTrackHitExpansionPt,

  // Typography weights
  labelWeightRegular,
  labelWeightEmphasis,
  pillTextWeight,
  pillTextMinimumFontScale,

  // Layout merge
  layoutScaleDefault,
} as const;

export type PercentageSliderTokens = typeof percentageSliderTokens;
