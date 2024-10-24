export interface SquareColorsPaletteInterface {
  default: string;
  active: string;
  success: string;
  failure: string;
}

export const SQUARE_COLORS_PALETTE: SquareColorsPaletteInterface = {
  default: '#5BA4CF',
  active: '#FFE680',
  success: '#87D37C',
  failure: '#F88379',
} as const;
