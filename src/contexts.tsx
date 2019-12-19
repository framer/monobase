import * as React from "react";
import { Project } from "./types";
import { project } from "./config";

export type PageContextType = {
  project: Project;
  path: string;
  styles: string;
};

export const PageContext = React.createContext<PageContextType>({
  project: project({ path: "." }),
  path: "/",
  styles: ""
});
