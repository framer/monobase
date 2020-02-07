import React from "react";
import { Button } from "fraction";
import { Example, Template, Toggle } from "components";

export default function render(project, styles) {
  return (
    <Template>
      <span style={{ textAlign: "center" }}>
        <Example title="Toggle">
          <Toggle />
        </Example>
        <Example title="Button">
          <Button>Chill Button</Button>
          <Button variant="primary">Important Button</Button>
        </Example>
      </span>
    </Template>
  );
}
