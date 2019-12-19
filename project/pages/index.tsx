import * as React from "react";

import Template from "components/Template";

import Timer from "components/examples/Timer";
import Mouse from "components/examples/Mouse";
import Button from "components/examples/Button";
import Styled from "components/examples/Styled";
import Colors from "components/examples/Colors";
import Cookie from "components/examples/Cookie";
import Visible from "components/examples/Visible";
import Context from "components/examples/Context";

export default function render(project, styles) {
  return (
    <Template>
      <span style={{ textAlign: "center" }}>
        <Example title="Button">
          <Button />
        </Example>
      </span>
    </Template>
  );
}

function Example(props) {
  return (
    <section
      style={{
        textAlign: "center",
        padding: "80px 10px"
      }}
    >
      <h3
        style={{
          fontSize: 30,
          fontWeight: 700,
          margin: 0,
          paddingBottom: 40,
          lineHeight: 1
        }}
      >
        {props.title}
      </h3>
      <div style={{ textAlign: "center" }}>{props.children}</div>
    </section>
  );
}
