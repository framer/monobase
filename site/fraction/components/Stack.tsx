import * as React from "react";
import { cx, CSSProperties } from "linaria";
import { HTMLDivAttributes, OverrideType } from "./types";
import {
  FlexDirection,
  JustifyContent,
  AlignItems,
  Wrap
} from "./Stack.styles";
import * as styles from "./Stack.styles";

type Padding = React.CSSProperties["padding"];

export type StackProps = OverrideType<
  HTMLDivAttributes,
  {
    direction?: FlexDirection;
    justifyContent?: JustifyContent;
    alignItems?: AlignItems;
    gap?: number;
    wrap?: Wrap;
    padding?: Padding;
    paddingTop?: Padding;
    paddingRight?: Padding;
    paddingBottom?: Padding;
    paddingLeft?: Padding;
    style?: Omit<
      React.CSSProperties,
      | "flexDirection"
      | "justifyContent"
      | "alignItems"
      | "padding"
      | "paddingTop"
      | "paddingRight"
      | "paddingBottom"
      | "paddingLeft"
    >;
  }
>;

function isVerticalDirection(direction: FlexDirection) {
  return !!direction && direction.includes("column");
}

function isReverseDirection(direction: FlexDirection) {
  return !!direction && direction.includes("reverse");
}

function toPadding(
  padding: Padding,
  paddingTop: Padding,
  paddingRight: Padding,
  paddingBottom?: Padding,
  paddingLeft?: Padding
): React.CSSProperties {
  const result: React.CSSProperties = {};
  if (padding !== undefined) result.padding = padding;
  if (paddingTop !== undefined) result.paddingTop = paddingTop;
  if (paddingRight !== undefined) result.paddingRight = paddingRight;
  if (paddingBottom !== undefined) result.paddingBottom = paddingBottom;
  if (paddingLeft !== undefined) result.paddingLeft = paddingLeft;
  return result;
}

export const Stack: React.FC<StackProps> = ({
  className,
  children,
  direction = "column",
  justifyContent = "flex-start",
  alignItems = "stretch",
  wrap = "nowrap",
  gap = 10,
  padding,
  paddingTop,
  paddingRight,
  paddingBottom,
  paddingLeft,
  style,
  ...rest
}) => {
  const isVertical = isVerticalDirection(direction);
  const isReverse = isReverseDirection(direction);
  const gapStyle: CSSProperties = {
    [styles.gapXKey]: `${isVertical ? 0 : gap}px`,
    [styles.gapYKey]: `${isVertical ? gap : 0}px`
  };

  return (
    <div
      style={{
        ...toPadding(
          padding,
          paddingTop,
          paddingRight,
          paddingBottom,
          paddingLeft
        ),
        ...style
      }}
      className={cx(
        styles.stack,
        gap > 0 && styles.withGap,
        direction && styles.direction[direction],
        alignItems && styles.align[alignItems],
        wrap && styles.wrap[wrap],
        justifyContent && styles.justify[justifyContent],
        isReverse && styles.reverse,
        className
      )}
      {...rest}
    >
      <div style={gapStyle} className={styles.stackGap}>
        {children}
      </div>
    </div>
  );
};
