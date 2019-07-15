import React from "react";
import { Config, Compiler } from "../compiler";
import { join } from "path";
import { project } from "../config";
import { __setContextForTest } from "../helpers";

describe("output", () => {
  beforeEach(() => {
    __setContextForTest({
      path: "pages",
      project: project({ path: "pages" }),
      url: "/about"
    });
  });

  afterEach(() => __setContextForTest(null));

  test("compiler output", async () => {
    const path = join(__dirname, "__data__");
    const compiler = new Compiler(path, {});
    await compiler.compile(["compiler-data1.ts"], {});

    expect(compiler.module.default()).toEqual("Hello world!");
  });
});
