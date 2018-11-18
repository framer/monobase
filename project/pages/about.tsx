import * as React from "react";
import Template from "components/Template";
import { useContext } from "monobase";

const style = { font: "11px/1.6em Menlo" };

export default function render() {
  const context = useContext();
  return (
    <Template>
      <div style={style}>
        <h2>Context</h2>
        <pre style={style}>{JSON.stringify(context, null, 4)}</pre>
      </div>
    </Template>
  );
}
