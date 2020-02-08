import { createCSSVariables, TokenCategory } from "../utils/variables";
import { colorsLight } from "./colorsLight";
import { colorsDark } from "./colorsDark";
export { ColorTokenMap } from "./colorTypes";

const scope = "color";

export const colors = createCSSVariables(colorsLight, scope);

export const colorTokensLight: TokenCategory = { tokens: colorsLight, scope };
export const colorTokensDark: TokenCategory = { tokens: colorsDark, scope };
