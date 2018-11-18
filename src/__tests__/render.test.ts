import { join } from "path";
import * as React from "react";
import { renderToString } from "react-dom/server";
import { Config, Compiler } from "../compiler";

test("compiler output2", async () => {
  const path = join(__dirname, "__data__");
  const config = Config(path, ["render-data1.tsx"]);

  const compiler = new Compiler(config);
  await compiler.compile();

  const app = compiler.module.default();
  const html = renderToString(app);

  expect(html).toMatchSnapshot();
});
