import { css } from "linaria";
import * as fonts from "../tokens/fonts";

export const cta = css`
  font-weight: 600;
  font-size: ${fonts.sizes.h5}px;
  letter-spacing: -0.5px;
  text-decoration: none;
  line-height: 1;

  &:hover {
    text-decoration: underline;
  }
`;
