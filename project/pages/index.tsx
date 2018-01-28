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

function render(project) {
  return (
    <Template project={project}>
      <span style={{ textAlign: "center" }}>
        <section style={{ padding: "60px" }}>
          <h1>Welcome to Monobase</h1>
          <p>A simple React based static site generator</p>
        </section>
        <Example title="Button">
          <Button />
        </Example>
        <Example title="Mouse Location">
          <Mouse />
        </Example>
        <Example title="Time">
          <Timer />
        </Example>
        <Example title="Enter a color name">
          <Colors />
        </Example>
        <Example title="Persistent Cookie">
          <Cookie />
        </Example>
        <Example title="Visible">
          <Visible inset={100}>
            I'm like a refrigerator light. Or Schrödinger's cat.
          </Visible>
        </Example>
        <Example title="CSS Styled">
          <Styled />
        </Example>
        <Example title="Random Image Grid">
          <Grid
            width={600}
            height={300}
            columns={4}
            rows={4}
            gap={10}
            cell={props => (
              <Visible>
                <Unsplash {...props} />
              </Visible>
            )}
          />
        </Example>
        <Example title="Picture">
          <Picture width={400} src="example1.png" alt="Example 1" />
          <Picture
            width={400}
            src="example2.png"
            alt="Example 2"
            extensions={["webp"]}
            hasRetina
          />
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

export default render;
