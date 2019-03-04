import * as fs from "fs";
import { project } from "../config";
import { pageForURL, urlForPage, pathForPage } from "../resolve";

jest.mock("fs");

const existsSync = fs.existsSync as jest.Mock<typeof fs.existsSync>;
existsSync.mockImplementation(() => false);

describe("resolve", () => {
  const createProject = (opts?: { path?: string; urlPrefix?: string }) =>
    project({ path: "pages", ...opts });

  describe("pageForURL", () => {
    test("returns the filepath for the url", () => {
      existsSync.mockImplementation(path => path.endsWith("about.tsx"));
      const project = createProject();

      expect(pageForURL(project, "/about")).toBe("about.tsx");
    });

    test("prefers index files", () => {
      existsSync.mockImplementation(
        path => path.endsWith("about.tsx") || path.endsWith("about/index.tsx")
      );
      const project = createProject();

      expect(pageForURL(project, "/about")).toBe("about/index.tsx");
    });

    test("prefers index files", () => {
      existsSync.mockImplementation(
        path => path.endsWith("about.tsx") || path.endsWith("about/index.tsx")
      );
      const project = createProject();

      expect(pageForURL(project, "/about")).toBe("about/index.tsx");
    });

    test("returns undefined for unmatched paths", () => {
      const project = createProject();
      expect(pageForURL(project, "/about")).toBe("about/index.tsx");
    });

    test("returns path as-is if includes extension", () => {
      const project = createProject();
      expect(pageForURL(project, "/about.tsx")).toBe("about.tsx");
    });

    test("strips out the urlPrefix if provided", () => {
      const project = createProject({ urlPrefix: "/blog" });
      existsSync.mockImplementation(path => path.endsWith("about.tsx"));
      expect(pageForURL(project, "/blog/about")).toBe("about.tsx");
    });

    test("normalizes trailing slashes", () => {
      const project = createProject();
      existsSync.mockImplementation(path => path.endsWith("about.tsx"));
      expect(pageForURL(project, "/about/")).toBe("about.tsx");

      const prefixed = createProject({ urlPrefix: "/blog" });
      expect(pageForURL(prefixed, "/blog/about/")).toBe("about.tsx");
    });

    test("ignores 404 & 500 pages", () => {
      const project = createProject();
      expect(pageForURL(project, "/404")).toBeUndefined();
      expect(pageForURL(project, "/500")).toBeUndefined();
    });
  });

  describe("urlForPage", () => {
    test("handles index files", () => {
      const project = createProject();
      expect(urlForPage(project, "pages/index.tsx")).toEqual("/");
      expect(urlForPage(project, "pages/koen/index.ts")).toEqual("/koen/");
      expect(urlForPage(project, "pages/test/index.tsx")).toEqual("/test/");
      expect(urlForPage(project, "pages/test/index.mdx")).toEqual("/test/");
    });

    test("handles named files", () => {
      const project = createProject();
      expect(urlForPage(project, "pages/index.tsx")).toEqual("/");
      expect(urlForPage(project, "pages/about.tsx")).toEqual("/about/");
    });

    test("applies a url prefix if provided", () => {
      const blog = createProject({ urlPrefix: "/blog" });
      expect(urlForPage(blog, "pages/index.tsx")).toEqual("/blog/");
      expect(urlForPage(blog, "pages/about.tsx")).toEqual("/blog/about/");
    });

    test("normalizes leading and trailing slashes", () => {
      const project = createProject();
      expect(urlForPage(project, "/pages/about.tsx")).toEqual("/about/");
    });
  });

  describe("pathForPage", () => {
    test("generates the filepath", () => {
      const project = createProject();
      expect(pathForPage(project, "pages/index.tsx")).toEqual("/index.html");
      expect(pathForPage(project, "pages/koen/index.ts")).toEqual(
        "/koen/index.html"
      );
      expect(pathForPage(project, "pages/test/index.tsx")).toEqual(
        "/test/index.html"
      );
      expect(pathForPage(project, "pages/test/index.mdx")).toEqual(
        "/test/index.html"
      );
    });

    test("special cases the error pages", () => {
      const project = createProject();
      expect(pathForPage(project, "pages/404.tsx")).toEqual("/404.html");
      expect(pathForPage(project, "pages/500.tsx")).toEqual("/500.html");
    });

    test("with prefix", () => {
      const project = createProject({ urlPrefix: "/blog" });
      expect(pathForPage(project, "pages/index.tsx")).toEqual(
        "/blog/index.html"
      );
      expect(pathForPage(project, "pages/koen.tsx")).toEqual(
        "/blog/koen/index.html"
      );
      expect(pathForPage(project, "pages/koen/index.tsx")).toEqual(
        "/blog/koen/index.html"
      );
    });

    test("with prefix special cases the error pages", () => {
      const project = createProject({ urlPrefix: "/blog" });
      expect(pathForPage(project, "pages/404.tsx")).toEqual("/blog/404.html");
      expect(pathForPage(project, "pages/500.tsx")).toEqual("/blog/500.html");
    });
  });
});
