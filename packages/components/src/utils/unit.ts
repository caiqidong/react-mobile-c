const DESIGN_BASE = 75;
const REM_PRECISION = 4;

const assertFinite = (value: number): void => {
  if (!Number.isFinite(value)) {
    throw new RangeError('Pixel value must be a finite number.');
  }
};

export const px2remValue = (px: number): number => {
  assertFinite(px);

  return Number((px / DESIGN_BASE).toFixed(REM_PRECISION));
};

export const px2rem = (px: number): string => `${px2remValue(px)}rem`;
