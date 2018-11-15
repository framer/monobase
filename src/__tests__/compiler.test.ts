import React from "react";
import { Config, Compiler } from "../compiler";
import { join } from "path";

test("compiler output", async () => {
  const path = join(__dirname, "__data__");
  const config = Config(path, ["compiler-data1.ts"]);

  const compiler = new Compiler(config);
  await compiler.compile();

  expect(compiler.output).toMatchSnapshot();
});

test("compiler eval", async () => {
  const path = join(__dirname, "__data__");
  const config = Config(path, ["compiler-data1.ts"]);

  const compiler = new Compiler(config);
  await compiler.compile();

  expect(compiler.module.default()).toEqual("Hello world!");
});
