import * as React from "react";
import * as styles from "./Text.styles";
import { cx } from "linaria";

type TextVariant =
  | "h0"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "body"
  | "small";

type TextElement = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";

export type TextProps = {
  // Get a heading level or just body text
  variant?: TextVariant;

  // Set a semantic element to use for rendering.
  as?: TextElement;
};

const textVariants: Record<TextVariant, { style: string; el: TextElement }> = {
  h0: {
    style: styles.h0,
    el: "h1"
  },
  h1: {
    style: styles.h1,
    el: "h1"
  },
  h2: {
    style: styles.h2,
    el: "h2"
  },
  h3: {
    style: styles.h3,
    el: "h3"
  },
  h4: {
    style: styles.h4,
    el: "h4"
  },
  h5: {
    style: styles.h5,
    el: "h5"
  },
  h6: {
    style: styles.h6,
    el: "h6"
  },
  body: {
    style: styles.body,
    el: "p"
  },
  small: {
    style: styles.small,
    el: "p"
  }
};

export const Text: React.FC<TextProps> = ({ children, as, variant }) => {
  const allowedVariants = [
    "h0",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "body",
    "small"
  ];
  const safeVariant = allowedVariants.includes(variant) ? variant : "body";

  const allowedElements = ["h1", "h2", "h3", "h4", "h5", "h6", "p"];
  const safeAs = as ? as.toLowerCase() : "";

  const El = allowedElements.includes(safeAs)
    ? safeAs
    : textVariants[safeVariant].el;

  return (
    <El className={cx(styles.text, textVariants[safeVariant].style)}>
      {children}
    </El>
  );
};
