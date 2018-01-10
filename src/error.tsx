import * as path from "path";
import * as types from "./types";
import * as React from "react";
import * as Markdown from "react-markdown";

export const render = (error: Error, project: types.Project) => {
  const projectPath = project.path;
  const modulePath = path.resolve(path.join(__dirname, ".."));

  const css = `
body { font: 14px/1.5em Helvetica Neue; color: rgba(0, 0, 0, 0.7); margin: 0 }
a { color: rgba(0, 0, 0, 0.85); }
pre, code { font: 12px/1.5em Menlo; color: whitespace: pre-wrap }
h2 { font: 18px/1.5em 'Helvetica Neue Bold' }
section { padding: 10px 20px; overflow: auto }
`;
  const shortPath = (text: string) => {
    return text
      .replace(new RegExp(projectPath, "g"), "<project>")
      .replace(new RegExp(modulePath, "g"), "<monobase>");
  };

  return (
    <html>
      <head>
        <style>{css}</style>
      </head>
      <body>
        <section
          style={{
            background: "rgba(255, 254, 197, 1.00)",
            borderBottom: "1px solid hsla(0, 0%, 0%, 0.05)"
          }}
        >
          <h2>Error 500</h2>
          <p>
            <Markdown source={shortPath(error.message)} />
          </p>
          <p>
            Project: <code>{projectPath}</code>
            <br />
            Monobase: <code>{modulePath}</code>
          </p>
        </section>
        <section style={{ marginBottom: 32 }}>
          <pre
            style={{
              color: "grey"
            }}
          >
            {shortPath(error.stack)}
          </pre>
        </section>
        <section
          style={{
            position: "fixed",
            width: "100%",
            bottom: 0,
            background: " rgba(238, 238, 238, 1.00)",
            borderTop: "1px solid rgba(0, 0, 0, 0.05)",
            fontSize: "90%",
            height: 24
          }}
        >
          Monobase
        </section>
      </body>
    </html>
  );
};
