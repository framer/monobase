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
        <script src={props.project.config.componentScript} />
      </body>
    </html>
  );
}

export default Template;
