import { project } from "../config";
import { relative, urlFor, __setContextForTest } from "../helpers";

describe("relative", () => {
  test("relative root", () => {
    expect(relative("/static/style.css", "/")).toEqual("static/style.css");
    expect(relative("/static/style.css", "/koen/")).toEqual(
      "../static/style.css"
    );
  });

  test("strips trailing slash", () => {
    expect(relative("/about/", "/")).toEqual("about");
    expect(relative("/about/", "/koen/")).toEqual("../about");
  });
});

describe("urlFor", () => {
  beforeEach(() => {
    __setContextForTest({
      path: "pages",
      project: project({ path: "pages" }),
      url: "/about"
    });
  });

  afterEach(() => __setContextForTest(null));

  test("handles index files", () => {
    expect(urlFor("pages/index.tsx")).toEqual("/");
    expect(urlFor("pages/koen/index.ts")).toEqual("/koen/");
    expect(urlFor("pages/test/index.tsx")).toEqual("/test/");
    expect(urlFor("pages/test/index.mdx")).toEqual("/test/");
  });

  test("handles named files", () => {
    expect(urlFor("pages/index.tsx")).toEqual("/");
    expect(urlFor("pages/about.tsx")).toEqual("/about/");
  });

  test("applies a url prefix if provided", () => {
    __setContextForTest({
      path: "pages",
      project: project({ path: "pages", urlPrefix: "/blog" }),
      url: "/about"
    });
    expect(urlFor("pages/index.tsx")).toEqual("/blog/");
    expect(urlFor("pages/about.tsx")).toEqual("/blog/about/");
  });

  test("handles static files", () => {
    expect(urlFor("static/main.js")).toEqual("/static/main.js");
    expect(urlFor("static/main.css")).toEqual("/static/main.css");
  });

  test("returns the url as-is if not pages or static", () => {
    expect(urlFor("/about")).toEqual("/about");
    expect(urlFor("/about/")).toEqual("/about/");
  });

  test("applies a url prefix if provided", () => {
    __setContextForTest({
      path: "pages",
      project: project({ path: "pages", urlPrefix: "/blog" }),
      url: "/about"
    });
    expect(urlFor("pages/index.tsx")).toEqual("/blog/");
    expect(urlFor("pages/about.tsx")).toEqual("/blog/about/");
    expect(urlFor("static/main.css")).toEqual("/blog/static/main.css");
    expect(urlFor("/about/")).toEqual("/blog/about/");
  });

  test("normalizes leading and trailing slashes", () => {
    expect(urlFor("/pages/about.tsx")).toEqual("/about/");
    expect(urlFor("/static/main.js")).toEqual("/static/main.js");
  });
});
