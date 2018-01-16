import * as React from "react";

import { Dynamic } from "monobase";

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
    return <span>This is the time: {this.time}</span>;
  }
}

export default Dynamic(Timer);
