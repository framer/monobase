import { project } from "../config";

describe("project", () => {
  test("without urlPrefix", () => {
    const proj = project({ path: "./", build: "production" });
    expect(proj).toEqual({
      path: "./",
      build: "production",
      config: {
        pages: "pages",
        static: "static",
        components: "components",
        componentScript: "/components.js",
        extensions: ["js", "ts", "tsx", "mdx"],
        urlPrefix: ""
      }
    });
  });

  test("with urlPrefix", () => {
    const proj = project({
      path: "./",
      build: "production",
      urlPrefix: "/blog"
    });
    expect(proj.config.urlPrefix).toEqual("/blog");
  });

  test("will normalize trailing slash in prefix", () => {
    const proj = project({
      path: "./",
      build: "production",
      urlPrefix: "blog/"
    });
    expect(proj.config.urlPrefix).toEqual("/blog");
  });

  test("will ignore / as a prefix", () => {
    const proj = project({
      path: "./",
      build: "production",
      urlPrefix: "/"
    });
    expect(proj.config.urlPrefix).toEqual("");
  });
});
