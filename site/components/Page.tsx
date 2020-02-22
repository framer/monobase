import * as React from "react";
import { Container } from "./Container";
import "../tokens/width.css";
import { Example } from "./Example";

export const Page = () => (
  <main>
    <Example title="Container" direction="column" spacing={50}>
      <Container
        className="width5"
        style={{ background: "#05f", color: "#fff", borderRadius: 20 }}
      >
        Width5
      </Container>
      <Container
        style={{ background: "#05f", color: "#fff", borderRadius: 20 }}
      >
        Default
      </Container>
      <Container
        style={{ background: "#05f", color: "#fff", borderRadius: 20 }}
        size="L"
      >
        L
      </Container>
      <Container
        style={{ background: "#05f", color: "#fff", borderRadius: 20 }}
        size="XL"
      >
        XL
      </Container>
    </Example>
  </main>
);
