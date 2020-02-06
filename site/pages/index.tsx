import React from "react";

import Template from "../components/Template";

import {Checkbox} from "../fraction/Checkbox";
import { Toggle } from "../components/Toggle";


export default function render(project, styles) {
  return (
    <Template>
      <span style={{ textAlign: "center" }}>
        <Example title="Button">
          <Toggle  />
        </Example>
        <Example title="Button">
          <Checkbox id="checkbox"  />
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
