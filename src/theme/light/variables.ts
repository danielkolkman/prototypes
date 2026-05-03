/**
 * Light theme — flat Figma token map (`colors` ∪ `spacing`) for CSS vars and lookups.
 * @see `variables.colors.ts` / `variables.spacing.ts` for the split source.
 */
import { lightVariableColors } from './variables.colors';
import { lightVariableSpacing } from './variables.spacing';

export const LIGHT_FIGMA_FILE_KEY = 'etBTFPHHkutiUBB0Gac59s';
export const LIGHT_FIGMA_NODE_ID = '14806:27950';

export const lightVariables = {
  ...lightVariableColors,
  ...lightVariableSpacing,
} as const;

export type LightVariableKey = keyof typeof lightVariables;
