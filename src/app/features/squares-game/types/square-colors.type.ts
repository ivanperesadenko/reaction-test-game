import { SQUARE_COLORS_PALETTE } from '@features/squares-game/constants/square-colors';

export type SquareColorsType =
  (typeof SQUARE_COLORS_PALETTE)[keyof typeof SQUARE_COLORS_PALETTE];
