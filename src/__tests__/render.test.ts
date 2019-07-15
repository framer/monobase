import { __setContextForTest } from "../helpers";
import { project } from "../config";
import * as render from "../render";
import { resolve } from "path";

// https://github.com/styled-components/styled-components/issues/1692
import * as styled from "styled-components";

const { StyleSheet } = styled[
  "__DO_NOT_USE_OR_YOU_WILL_BE_HAUNTED_BY_SPOOKY_GHOSTS"
];

describe("output", () => {
  beforeEach(() => {
    StyleSheet.reset(true);
    __setContextForTest({
      path: "pages",
      project: project({ path: "pages" }),
      url: "/about"
    });
  });

  afterEach(() => __setContextForTest(null));

  const proj = project({ path: resolve(__dirname, "../../project") });

  test("/index.tsx", async () => {
    expect(await render.page(proj, "/index.tsx")).toMatchSnapshot();
  });

  test("/about.tsx", async () => {
    expect(await render.page(proj, "/about.tsx")).toMatchSnapshot();
  });

  test("/article.mdx", async () => {
    expect(await render.page(proj, "/article.mdx")).toMatchSnapshot();
  });
});
