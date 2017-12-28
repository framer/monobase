import * as React from "react";

import { Dynamic } from "monobase";

const style: React.CSSProperties = {
  width: 100,
  height: 40,
  display: "inline-block",
  backgroundColor: "yellow",
  font: "14px/38px Helvetica",
  userSelect: "none",
  textAlign: "center",
  borderRadius: "40px",
  margin: 10
};

class Button extends React.Component {
  value = 0;

  onClick = () => {
    this.value++;
    this.forceUpdate();
  };

  render() {
    return (
      <div style={style} onClick={this.onClick}>
        Button {this.value}
      </div>
    );
  }
}

export default Dynamic(Button);
