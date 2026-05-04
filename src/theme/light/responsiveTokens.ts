/**
 * **Responsive layout tokens** for the light theme — reference widths, scale clamps,
 * and design-base values used by `lightSliderLayout()` and related UI.
 *
 * Keep slider scaling formulas in `responsive.ts`; put only shared constants here
 * so all responsive numbers are discoverable from this module.
 */

/** Figma / Core Components reference width (px). */
export const LIGHT_LAYOUT_REFERENCE_WIDTH = 343;

/** Do not scale layouts below this window width (px). */
export const LIGHT_LAYOUT_MIN_WINDOW_WIDTH = 280;

/**
 * Design-base width for tick-mark horizontal inset (px). Actual padding is derived
 * in `lightSliderLayout` from window width × this ratio vs reference.
 */
export const LIGHT_TICK_MARKS_BASE_PX = 72;

/** Upper bound multiplier on tick padding vs the scaled base. */
export const LIGHT_TICK_MARKS_PADDING_CAP_RATIO = 1.1;

/** Design-base for ruler + pill cluster width (px), before width-scale clamp. */
export const LIGHT_RULER_CLUSTER_BASE_PX = 64;

/** Max / min multipliers when scaling cluster width from layout scale. */
export const LIGHT_RULER_CLUSTER_SCALE_MAX = 1.08;
export const LIGHT_RULER_CLUSTER_SCALE_MIN = 0.92;

/** Caps vertical rhythm scale for status row gap and pill–ruler gap. */
export const LIGHT_VERTICAL_RHYTHM_SCALE_CAP = 1.05;

/** Default ruler width (px); fixed in layout, not from Figma string token. */
export const LIGHT_RULER_WIDTH_PX = 3;

/** Default ruler corner radius (px) for the thumb column. */
export const LIGHT_RULER_BORDER_RADIUS_PX = 10;

/** Default bottom padding inside ruler column (px). */
export const LIGHT_RULER_PADDING_BOTTOM_PX = 5;
