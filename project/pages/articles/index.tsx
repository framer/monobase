import * as fs from "fs";
import * as React from "react";
import Template from "components/Template";

function getContext(path: string) {
  try {
    return require(`./${path}`).context;
  } catch (error) {
    return {};
  }
}

function render(project, context) {
  const files = fs.readdirSync(__dirname);

  return (
    <Template project={project}>
      <h4>{context.path}</h4>
      <p>
        <ul>
          {fs.readdirSync(__dirname).map(name => {
            if (name === "index.tsx") {
              return;
            }

            const context = getContext(name);
            return (
              <li>
                <a href={name.replace(".tsx", "")}>{context.title}</a>{" "}
                {context.date.toString()}
              </li>
            );
          })}
        </ul>
      </p>
    </Template>
  );
}

export default render;
