import * as React from "react";
import Template from "components/Template";

export const context = {
  title: "Article 2",
  date: new Date("2016-04-10")
};

function render(project, context) {
  return <Template project={project}>Hello</Template>;
}

export default render;
