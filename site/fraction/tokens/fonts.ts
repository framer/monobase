export const size = [0, 12, 14, 16, 18, 26, 36, 48, 58, 72, 110];

export enum FontFamilies {
  colfax = "Colfax, sans-serif",
  input = "Input Mono, monospace"
}

export const family = {
  default: FontFamilies.colfax,
  input: FontFamilies.input
};

export const sizes = {
  formLabel: size[2],
  body: size[4],
  h6: size[4],
  h5: size[5],
  h4: size[6],
  h3: size[7],
  h2: size[8],
  h1: size[9],
  h0: size[10]
};
