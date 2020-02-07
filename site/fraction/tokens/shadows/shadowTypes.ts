import { ValueMap } from "../utils/variables";

export type ShadowTokenMap = ValueMap<ShadowKey>;

type ShadowKey =
  | "button"
  | "buttonHover"
  | "buttonActive"
  | "buttonTinted"
  | "buttonTintedHover"
  | "buttonTintedActive"
  | "knob"
  | "card"
  | "cardTinted"
  | "cardHover"
  | "imageBorderOverlay"
  | "knob";
