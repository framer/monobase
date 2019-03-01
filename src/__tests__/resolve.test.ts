import { urlForPage } from "../resolve";

test("resolve", () => {
  expect(urlForPage("pages", "pages/index.tsx")).toEqual("/");
  expect(urlForPage("pages", "pages/koen/index.ts")).toEqual("/koen/");
  expect(urlForPage("pages", "pages/test/index.tsx")).toEqual("/test/");
});
