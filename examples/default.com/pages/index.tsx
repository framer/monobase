import * as React from "react";
import * as ReactDOM from "react-dom";

import { Project } from "monobase";

import Template from "../components/Template";
import Timer from "../components/Timer";
import Button from "../components/Button";
import MouseLocation from "../components/MouseLocation";

const style: React.CSSProperties = {
  font: "14px/1.3em Monaco"
};

const render = (project: Project) => {
  return (
    <Template project={project}>
      <h3>
        Welcome to <a href="/test">Framer</a>
      </h3>
      <p style={style}>This is Framer</p>
      <Button />
      <Button />
      <Button />
      <Timer />
      <MouseLocation />
    </Template>
  );
};

export default render;
