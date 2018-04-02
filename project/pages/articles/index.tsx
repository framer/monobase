import * as fs from "fs";
import * as path from "path";
import * as React from "react";

import Template from "components/Template";

function getArticleContext(filePath: string) {
  try {
    return require(`./${filePath}`).context;
  } catch (error) {
    return {};
  }
}

function getArticles(filePath: string) {
  return fs
    .readdirSync(filePath)
    .filter(item => path.basename(item, path.extname(item)) !== "index");
}

function render(project, context) {
  return (
    <Template project={project}>
      <h4>{context.path}</h4>
      <p>
        <ul>
          {getArticles(__dirname).map(name => {
            const article = getArticleContext(name);
            return (
              <li key={name}>
                <a href={name.replace(".tsx", "")}>{article.title}</a>{" "}
                {article.date.toString()}
              </li>
            );
          })}
        </ul>
      </p>
    </Template>
  );
}

export default render;
