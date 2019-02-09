import * as React from "react";
import { Dynamic } from "monobase";
import { pill } from "components/theme";

const style: React.CSSProperties = {
  ...pill,
  background: "#0AF",
  color: "#fff"
};

function Button() {
  const [count, setCount] = React.useState(0);

  function onClick() {
    setCount(count + 1);
  }

  return (
    <button style={style} onClick={onClick}>
      Count: {count}
    </button>
  );
}

export default Dynamic(Button);
