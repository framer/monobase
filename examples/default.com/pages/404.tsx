import * as React from "react";
import * as ReactDOM from "react-dom";

import { Project } from "monobase";

import Template from "../components/Template";

const render = (project: Project) => {
  return (
    <Template project={project}>
      <h3>404 File not found</h3>
    </Template>
  );
};

export default render;
