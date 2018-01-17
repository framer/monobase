import * as React from "react";
import { Dynamic } from "monobase";
import { pill } from "components/theme";

const style = {
  ...pill,
  border: "1px solid #F0F0F0",
  fontFamily: "monospace"
};

class Timer extends React.Component {
  time = Date.now();

  componentDidMount() {
    setInterval(this.update, 200);
  }

  update = () => {
    this.time = Date.now();
    this.forceUpdate();
  };

  render() {
    return <button style={style}>{this.time}</button>;
  }
}

export default Dynamic(Timer);
