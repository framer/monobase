import * as React from "react";

import { Dynamic } from "monobase";

const height = 60;

const style: React.CSSProperties = {
  width: 100,
  padding: "0px 20px",
  fontWeight: "bold",
  height: height,
  display: "inline-block",
  backgroundColor: "lightblue",
  userSelect: "none",
  textAlign: "center",
  borderRadius: "40px",
  margin: 10,
  lineHeight: height - 2 + "px"
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
