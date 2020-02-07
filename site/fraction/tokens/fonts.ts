export enum FontSize {
  xxsmall = 12,
  xsmall = 14,
  small = 16,
  base = 18,
  h5 = 26,
  h4 = 36,
  h3 = 48,
  h2 = 58,
  h1 = 72,
  h0 = 110
}

export enum FontFamilies {
  colfax = "Colfax, sans-serif",
  input = "Input Mono, monospace"
}

export const fonts = {
  family: {
    default: FontFamilies.colfax,
    input: FontFamilies.input
  },
  size: {
    xxsmall: FontSize.xxsmall,
    xsmall: FontSize.xsmall,
    small: FontSize.small,
    base: FontSize.base,
    h5: FontSize.h5,
    h4: FontSize.h4,
    h3: FontSize.h3,
    h2: FontSize.h2,
    h1: FontSize.h1,
    h0: FontSize.h0
  }
};
