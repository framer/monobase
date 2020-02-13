export const dimension = (n: number) => n * 4;

export type DimensionTokens = {
  // Input
  readonly inputHeight: number;
  readonly inputHeightLarge: number;
  readonly inputRadius: number;
  readonly inputRadiusLarge: number;
  readonly checkboxRadius: number;
  readonly inputPaddingHorizontal: number;
  readonly inputPaddingHorizontalLarge: number;
};

export const dimensions: DimensionTokens = {
  inputHeight: dimension(12),
  inputHeightLarge: dimension(14),
  inputRadius: dimension(3),
  inputRadiusLarge: 14,
  checkboxRadius: dimension(1),
  inputPaddingHorizontal: dimension(4),
  inputPaddingHorizontalLarge: dimension(5)
};
