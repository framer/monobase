import * as React from "react";
import { Project } from "monobase";

type TemplateProps = {
  project: Project;
  children?: React.ReactNode;
};

const Template = (props: TemplateProps) => {
  return (
    <html>
      <head>
        <style />
      </head>
      <body>
        {props.children}
        <script src="https://unpkg.com/react@16/umd/react.development.js" />
        <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js" />
        <script src={props.project.config.componentScript} />
      </body>
    </html>
  );
};

export default Template;
