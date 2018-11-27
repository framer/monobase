export type ProjectConfiguration = {
  pages: string;
  components: string;
  static: string;
  componentScript: string;
  extensions: string[];
};

export type Project = {
  path: string;
  config: ProjectConfiguration;
  build: "debug" | "production";
};

export type Context = {
  project: Project;
  path: string;
  url: string;
};
