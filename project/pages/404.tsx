import * as React from "react";
import * as ReactDOM from "react-dom";

import Template from "components/Template";

function render(project) {
  return (
    <Template project={project}>
      <h3>404 File not found</h3>
    </Template>
  );
}

export default render;
