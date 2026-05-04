/**
 * Dark theme — flat token map (`colors` ∪ `spacing`) for lookups.
 * @see `variables.colors.ts` / `variables.spacing.ts` for the split source.
 */
import { darkVariableColors } from './variables.colors';
import { darkVariableSpacing } from './variables.spacing';

export const darkVariables = {
  ...darkVariableColors,
  ...darkVariableSpacing,
} as const;

export type DarkVariableKey = keyof typeof darkVariables;
