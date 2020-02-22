import * as React from "react";
import styles from "./Container.css";
import cx from "classnames";

type ContainerProps = {
  size?: "L" | "XL";
  style?: React.CSSProperties;
  className?: string;
};

export const Container: React.FC<ContainerProps> = ({
  children,
  size,
  style,
  className
}) => {
  const containerClassNames = cx(styles.container, className, {
    [styles.containerL]: size === "L",
    [styles.containerXl]: size === "XL"
  });

  return (
    <div className={containerClassNames} style={style}>
      {children}
    </div>
  );
};
