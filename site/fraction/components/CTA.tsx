import * as React from "react";
import * as styles from "./CTA.styles";
import { cx } from "linaria";
import { IconCTAChevron } from "fraction/icons";
import { HTMLAnchorAttributes } from "./types";
import { Stack } from "./Stack";
import { colors } from "../tokens";

export type CTAProps = HTMLAnchorAttributes & {
  /** Icon */
  icon?: React.FunctionComponent;

  /** Click handler */
  onClick?: React.MouseEventHandler;

  /** Show arrow/icon on the left side */
  iconSide?: "left" | "right";

  /** Use a custom tint */
  tint?: string;
};

export const CTA: React.FC<CTAProps> = ({
  children,
  className,
  style,
  iconSide,
  tint = colors.tintPrimary,
  icon,
  ...rest
}) => {
  const renderIconOnRightSide = (!iconSide && !icon) || iconSide === "right";
  const flipIcon = iconSide === "left" && !icon;
  const Icon = icon || IconCTAChevron;

  return (
    <a
      className={cx(styles.cta, className)}
      style={{ color: tint, ...style }}
      {...rest}
    >
      <Stack direction="row" alignItems="center" gap={10}>
        {!renderIconOnRightSide && (
          <span style={{ transform: flipIcon && "rotate(-180deg)" }}>
            <Icon />
          </span>
        )}
        <span style={{ marginTop: 2 }}>{children}</span>
        {renderIconOnRightSide && (
          <span>
            <Icon />
          </span>
        )}
      </Stack>
    </a>
  );
};
