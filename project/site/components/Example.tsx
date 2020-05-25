import * as React from "react";
import styles from "./Example.css";

type ExampleProps = {
  title: string;
  direction?: "row" | "column";
  spacing?: number;
};

export const Example: React.FC<ExampleProps> = ({
  children,
  title,
  direction = "row",
  spacing = 20,
}) => (
  <section
    className={styles.example}
    style={{
      flexDirection: direction,
      paddingTop: spacing,
      paddingBottom: spacing,
    }}
  >
    <h3>{title}</h3>
    {children}
  </section>
);
