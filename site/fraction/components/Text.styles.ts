import { css } from "linaria";
import { fonts, colors } from "../tokens";

export const text = css`
  line-height: 1.5;
  color: ${colors.text};
`;

export const h0 = css`
  font-weight: 800;
  font-size: ${fonts.size.h0}px;
  letter-spacing: -5px;
`;

export const h1 = css`
  font-weight: 800;
  font-size: ${fonts.size.h1}px;
  letter-spacing: -3px;
`;

export const h2 = css`
  font-weight: 800;
  font-size: ${fonts.size.h2}px;
  letter-spacing: -2px;
`;

export const h3 = css`
  font-weight: 800;
  font-size: ${fonts.size.h3}px;
  letter-spacing: -1px;
`;

export const h4 = css`
  font-weight: 800;
  font-size: ${fonts.size.h4}px;
  letter-spacing: -0.5px;
`;

export const h5 = css`
  font-size: ${fonts.size.h5}px;
  letter-spacing: -0.5px;
`;

export const h6 = css`
  font-size: ${fonts.size.base}px;
`;

export const body = css`
  font-size: ${fonts.size.base}px;
`;

export const small = css`
  font-size: ${fonts.size.small}px;
`;
