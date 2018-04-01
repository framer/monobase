import * as React from "react";
import Template from "components/Template";

function render(project, context) {
  return <Template project={project}>About this site {context.path}</Template>;
}

export default render;
