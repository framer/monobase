import * as React from "react";
import * as styles from "./Button.styles";
import { cx } from "linaria";

type ButtonVariant = "default" | "primary" | "destructive";
type ButtonSize = "default" | "large";

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  round?: boolean;
};

const variantStyles: Record<ButtonVariant, string | undefined> = {
  default: undefined,
  primary: styles.buttonPrimary,
  destructive: styles.buttonDestructive
};

const sizeStyles: Record<ButtonSize, string | undefined> = {
  default: undefined,
  large: styles.buttonLarge
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant,
  size,
  round
}) => (
  <button
    className={cx(
      styles.button,
      variant && variantStyles[variant],
      size && sizeStyles[size],
      round && "round"
    )}
  >
    {children}
  </button>
);
