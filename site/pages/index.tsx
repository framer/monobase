import React from "react";
import { Button } from "fraction";
import { Example, Template, Toggle } from "components";

export default function render(project, styles) {
  return (
    <Template>
      <Example title="Toggle">
        <Toggle />
      </Example>
      <Example title="Button">
        <Button>Default</Button>
        <Button variant="primary">Important</Button>
        <Button variant="destructive">Dangerous</Button>
        <Button size="large">Large</Button>
      </Example>
      <Example title="Button Round">
        <Button round>Default</Button>
        <Button round variant="primary">
          Important
        </Button>
        <Button round variant="destructive">
          Dangerous
        </Button>
        <Button round size="large">
          Large
        </Button>
      </Example>
    </Template>
  );
}
