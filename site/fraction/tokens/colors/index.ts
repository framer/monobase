import { createCSSVariables } from "../utils/variables";
import { colorsLight } from "./colorsLight";
import { colorsScope } from "./colorsScope";

export { ColorTokenMap } from "./colorTypes";
export const colors = createCSSVariables(colorsLight, colorsScope);
