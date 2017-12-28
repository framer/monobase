import { script } from "./render";

it("should send render", async () => {
  const result = await script("./pages/test.tsx");

  console.log(result);
});
