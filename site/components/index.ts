import { Dynamic } from "monobase";
import * as fraction from "../fraction";

// Static components
export { Example } from "./Example";
export { Template } from "./Template";

// Dynamic components
export const Toggle = Dynamic(fraction.Toggle);
