import * as React from "react";
import * as Markdown from "react-remarkable";
import Template from "components/Template";

export const context = {
  title: "Article 1",
  date: new Date("2017-08-12")
};

function render(project, context) {
  return (
    <Template project={project}>
      <Markdown>{`
## Hello This is a markdown file

### Subtitle

- This
- Is a
- List

      `}</Markdown>
    </Template>
  );
}

export default render;
