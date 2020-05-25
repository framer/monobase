import React from "react";
import { Template } from "components/Template";
import { Container } from "fraction";
import { Example } from "components/Example";

const style = { background: "#05f", color: "#fff", borderRadius: 20 };

export function render() {
  return (
    <Template>
      <Example title="Container" direction="column" spacing={50}>
        <Container className="width5" style={style}>
          Custom width
        </Container>
        <Container style={style}>Default</Container>
        <Container style={style} size="L">
          L
        </Container>
        <Container style={style} size="XL">
          XL
        </Container>
      </Example>
    </Template>
  );
}
