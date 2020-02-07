import { cx } from "linaria";
import * as React from "react";
import * as styles from "./Toggle.styles";

export type ToggleProps = {
  checked?: boolean;
  onChange?: (value: boolean) => void;
};

export const Toggle: React.FC<ToggleProps> = ({ checked, onChange }) => {
  const [checkedState, setCheckedState] = React.useState(checked || false);
  const value = typeof checked === "undefined" ? checkedState : checked;

  function handleChange() {
    const newValue = !value;
    setCheckedState(newValue);
    if (onChange) onChange(newValue);
  }

  return (
    <div
      className={cx(styles.toggle, value && styles.toggleActive)}
      onClick={handleChange}
    />
  );
};
