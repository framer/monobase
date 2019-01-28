import React from "react";
import { relative } from "../helpers";
import { join } from "path";

test("relative root", () => {
  expect(relative("/static/style.css", "/")).toEqual("static/style.css");
  expect(relative("/static/style.css", "/koen/")).toEqual(
    "../static/style.css"
  );
});
