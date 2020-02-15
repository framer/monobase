import { css } from "linaria";
import { colors } from "../tokens";
import * as fonts from "../tokens/fonts";

export const text = css`
  line-height: 1.5;
  color: ${colors.text};
`;

export const h0 = css`
  font-weight: 800;
  font-size: ${fonts.sizes.h0}px;
  letter-spacing: -5px;
`;

export const h1 = css`
  font-weight: 800;
  font-size: ${fonts.sizes.h1}px;
  letter-spacing: -3px;
`;

export const h2 = css`
  font-weight: 800;
  font-size: ${fonts.sizes.h2}px;
  letter-spacing: -2px;
`;

export const h3 = css`
  font-weight: 800;
  font-size: ${fonts.sizes.h3}px;
  letter-spacing: -1px;
`;

export const h4 = css`
  font-weight: 800;
  font-size: ${fonts.sizes.h4}px;
  letter-spacing: -0.5px;
`;

export const h5 = css`
  font-size: ${fonts.sizes.h5}px;
  letter-spacing: -0.5px;
`;

export const h6 = css`
  font-size: ${fonts.sizes.body}px;
`;

export const body = css`
  font-size: ${fonts.sizes.body}px;
`;

export const small = css`
  font-size: ${fonts.sizes.small}px;
`;
