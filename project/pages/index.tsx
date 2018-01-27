import * as React from "react";

import Template from "components/Template";

import Grid from "components/examples/Grid";
import Timer from "components/examples/Timer";
import Mouse from "components/examples/Mouse";
import Button from "components/examples/Button";
import Styled from "components/examples/Styled";
import Colors from "components/examples/Colors";
import Cookie from "components/examples/Cookie";
import Visible from "components/examples/Visible";
import Picture from "components/examples/Picture";
import Unsplash from "components/examples/Unsplash";

const Cell = props => {
  return (
    <Visible inset={100}>
      <Unsplash {...props} />
    </Visible>
  );
};

function render(project) {
  return (
    <Template project={project}>
      <Example title="Random Image Grid">
        <Grid
          width={600}
          height={1800}
          columns={2}
          rows={2}
          gap={10}
          cell={Cell}
        />
      </Example>
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

export default render;
