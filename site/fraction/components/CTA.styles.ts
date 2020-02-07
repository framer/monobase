import { css } from "linaria";
import { fonts } from "../tokens";

export const cta = css`
  font-weight: 600;
  font-size: ${fonts.size.h5}px;
  letter-spacing: -0.5px;
  text-decoration: none;
  line-height: 1;

  &:hover {
    text-decoration: underline;
  }
`;
