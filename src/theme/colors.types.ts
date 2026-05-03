/** Semantic colors consumed by screens and the percentage slider (`useTheme().colors`). */

export interface ThemeColors {
  // --- Screen & cards ---
  background: string;
  surface: string;
  border: string;

  // --- Typography & accent ---
  textPrimary: string;
  textSecondary: string;
  accent: string;

  // --- Slider thumb & rail ---
  sliderRail: string;
  sliderFill: string;
  sliderDot: string;
  sliderThumbBg: string;
  sliderThumbBorder: string;
  sliderThumbShadow: string;

  // --- Inline actions (e.g. Max) ---
  ghostButtonLabel: string;
  primaryButtonLabel: string;

  // --- Percentage slider chrome ---
  sliderContainerBg: string;
  sliderContainerBorder: string;
  sliderTrackBase: string;
  sliderInactiveUniform: string;
  sliderDraggingFill: string;
  sliderDraggingFillBorder: string;
  sliderRulerInactive: string;
  sliderRulerActive: string;
  sliderPillSecondaryBg: string;
  sliderPillSecondaryText: string;
  sliderPillPrimaryText: string;
  sliderTickMuted: string;
  sliderTickOnFill: string;
}
