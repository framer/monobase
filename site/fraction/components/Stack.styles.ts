import { css } from "linaria";

// Since we map each property to a class, we need to only allow properties we support.
// For example, we don't support '-moz-initial'.
export type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
export type JustifyContent =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-evenly"
  | "baseline"
  | "space-around"
  | "stretch";
export type AlignItems =
  | "center"
  | "flex-start"
  | "flex-end"
  | "space-between"
  | "space-evenly"
  | "space-around"
  | "stretch";
export type Wrap = "wrap" | "wrap-reverse" | "nowrap";

export const gapXKey = "--gap-x";
export const gapYKey = "--gap-y";

export const stackGap = css`
  display: contents;
`;

export const reverse = css``;

export const stack = css`
  display: flex;
`;

export const withGap = css`
  & > .${stackGap} > * {
    margin-top: calc(var(${gapYKey}) / 2);
    margin-bottom: calc(var(${gapYKey}) / 2);
    margin-right: calc(var(${gapXKey}) / 2);
    margin-left: calc(var(${gapXKey}) / 2);
  }

  /* This should take the language direction into account */
  &:not(.${reverse}) > .${stackGap} > *:first-child,
  &.${reverse} > .${stackGap} > *:last-child {
    margin-top: 0;
    margin-left: 0;
  }

  /* This should take the language direction into account */
  &:not(.${reverse}) > .${stackGap} > *:last-child,
  &.${reverse} > .${stackGap} > *:first-child {
    margin-right: 0;
    margin-bottom: 0;
  }
`;

export const direction: Record<FlexDirection, string> = {
  row: css`
    flex-direction: row;
  `,
  column: css`
    flex-direction: column;
  `,
  "column-reverse": css`
    flex-direction: column-reverse;
  `,
  "row-reverse": css`
    flex-direction: row-reverse;
  `
};

export const wrap: Record<Wrap, string> = {
  wrap: css`
    flex-wrap: wrap;
  `,
  "wrap-reverse": css`
    flex-wrap: wrap-reverse;
  `,
  nowrap: css`
    flex-wrap: nowrap;
  `
};
export const align: Record<AlignItems, string> = {
  center: css`
    align-items: center;
  `,
  "flex-start": css`
    align-items: flex-start;
  `,
  "flex-end": css`
    align-items: flex-end;
  `,
  "space-between": css`
    align-items: space-between;
  `,
  "space-evenly": css`
    align-items: space-evenly;
  `,
  "space-around": css`
    align-items: space-around;
  `,
  stretch: css`
    align-items: "stretch";
  `
};
export const justify: Record<JustifyContent, string> = {
  center: css`
    justify-content: center;
  `,
  "flex-start": css`
    justify-content: flex-start;
  `,
  "flex-end": css`
    justify-content: flex-end;
  `,
  "space-between": css`
    justify-content: space-between;
  `,
  "space-evenly": css`
    justify-content: space-evenly;
  `,
  baseline: css`
    justify-content: baseline;
  `,
  "space-around": css`
    justify-content: space-around;
  `,
  stretch: css`
    justify-content: stretch;
  `
};
