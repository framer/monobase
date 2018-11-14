import React from "react";
import { Config, Compiler } from "../compiler";
import { join } from "path";

test("The configuration stays stable", async () => {
  const path = join(__dirname, "__data__");
  const config = Config(path, ["compiler-data1.ts"]);

  const compiler = new Compiler(config);
  await compiler.compile();

  expect(compiler.output).toMatchSnapshot();
});
