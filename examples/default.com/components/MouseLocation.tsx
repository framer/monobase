import * as React from "react";

import { Dynamic } from "@monobase";

declare var document;

const style: React.CSSProperties = {
  width: 100,
  height: 40,
  display: "inline-block",
  backgroundColor: "lightgrey",
  font: "14px/38px Helvetica",
  userSelect: "none",
  textAlign: "center",
  borderRadius: "40px",
  margin: 10
};

class MouseLocation extends React.Component {
  point = { x: 0, y: 0 };

  componentDidMount() {
    document.addEventListener("mousemove", this.onMouseMove);
  }

  onMouseMove = event => {
    this.point = { x: event.clientX, y: event.clientY };
    this.forceUpdate();
  };

  render() {
    return (
      <div style={style}>
        {this.point.x}, {this.point.y}
      </div>
    );
  }
}

export default Dynamic(MouseLocation);
