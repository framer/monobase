import * as React from "react";
import * as ReactDOM from "react-dom";

import { Project } from "monobase";

import Template from "../components/Template";
import Timer from "../components/Timer";
import Button from "../components/Button";
import MouseLocation from "../components/MouseLocation";
import CSSComponent from "../components/CSSComponent";

function Example(props) {
  return (
    <section
      style={{ height: 200, padding: 20, borderTop: "1px solid lightgrey" }}
    >
      <h3>{props.title} Example</h3>
      <p>{props.description}</p>
      <div>{props.children}</div>
    </section>
  );
}

function render(project: Project) {
  return (
    <Template project={project}>
      <span style={{ textAlign: "center" }}>
        <section style={{ height: 200, padding: 60 }}>
          <h1>Welcome to Monobase koen</h1>
          <p>A simple React based static site generator</p>
        </section>
        <Example title="Button" description="Click me">
          <Button />
        </Example>
        <Example title="Mouse Location" description="Move your mouse">
          <MouseLocation />
        </Example>
        <Example title="Time" description="Just wait and watch">
          <Timer />
        </Example>
        <Example title="CSS Component" description="Style with style">
          <CSSComponent />
        </Example>
      </span>
    </Template>
  );
}

export default render;
