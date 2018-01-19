import * as React from "react";
import { Dynamic } from "monobase";
import { pill } from "components/theme";

const style = {
  ...pill,
  border: "1px solid #F0F0F0",
  fontFamily: "monospace"
};

class Timer extends React.Component<{}, { time: number }> {
  state = { time: 0 };

  componentDidMount() {
    setInterval(this.update, 200);
  }

  update = () => {
    this.setState({ time: Date.now() });
  };

  render() {
    return <button style={style}>{this.state.time}</button>;
  }
}

export default Dynamic(Timer);
