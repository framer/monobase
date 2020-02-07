export type OverrideType<T, O extends object> = Omit<T, keyof O> & O;

// Attributes
export type HTMLAnchorAttributes = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

export type HTMLDivAttributes = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;
