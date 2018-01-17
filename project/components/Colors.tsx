import * as React from "react";
import { Dynamic } from "monobase";
import { pill } from "components/theme";

class Colors extends React.Component<{}, { color: string }> {
  constructor(props) {
    super(props);
    this.state = { color: "" };
    this.updateInput = this.updateInput.bind(this);
  }

  updateInput(event) {
    this.setState({ color: event.target.value });
  }

  render() {
    return (
      <div style={{ width: 300, margin: "auto" }}>
        <div
          style={{
            height: 300,
            borderRadius: "8px 8px 0 0",
            transition: "background-color .2s",
            backgroundColor: this.state.color ? this.state.color : "#EEE"
          }}
        />
        <input
          type="text"
          value={this.state.color}
          placeholder="like 'darksalmon'"
          onChange={this.updateInput}
          style={{
            ...pill,
            width: "100%",
            borderTop: "none",
            textAlign: "center",
            border: "1px solid #EEE",
            borderRadius: "0 0 8px 8px"
          }}
        />
      </div>
    );
  }
}

export default Dynamic(Colors);
