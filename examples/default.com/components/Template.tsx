import * as React from "react";
import { Project } from "monobase";

function Template(props: { project: Project; children?: React.ReactNode }) {
  return (
    <html>
      <head>
        <link rel="stylesheet" href="/static/styles.css" />
      </head>
      <body>
        {props.children}
        <script src="https://unpkg.com/react@16/umd/react.development.js" />
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" />
        <script src={props.project.config.componentScript} />
      </body>
    </html>
  );
}

export default Template;
