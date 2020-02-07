import React from "react";
import { Example, Template, Toggle } from "components";
import { Button } from "fraction";

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
