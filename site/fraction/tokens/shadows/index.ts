import { createCSSVariables, TokenCategory } from "../utils/variables";
import { shadowsLight } from "./shadowsLight";
export { ShadowTokenMap } from "./shadowTypes";

const scope = "shadow";

export const shadows = createCSSVariables(shadowsLight, scope);

export const shadowTokensLight: TokenCategory = { tokens: shadowsLight, scope };
