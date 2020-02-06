import React from "react";
import { Example, Template, Toggle } from "components";
import { Checkbox } from "fraction";

export default function render(project, styles) {
  return (
    <Template>
      <span style={{ textAlign: "center" }}>
        <Example title="Button">
          <Toggle />
        </Example>
        <Example title="Button">
          <Checkbox id="checkbox" />
        </Example>
      </span>
    </Template>
  );
}
