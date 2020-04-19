import * as React from "react";
import { Dynamic } from "monobase";
import styles from "components/theme.css";

const style: React.CSSProperties = {
  background: "#0AF",
  color: "#fff",
};

function Button() {
  const [count, setCount] = React.useState(0);

  function onClick() {
    setCount(count + 1);
  }

  return (
    <button className={styles.pill} style={style} onClick={onClick}>
      Count: {count}
    </button>
  );
}

export default Dynamic(Button);
