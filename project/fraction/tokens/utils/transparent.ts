import { insertString } from "../../utils"

const hexRegex = /^#[a-fA-F0-9]{6}$/
const reducedHexRegex = /^#[a-fA-F0-9]{3}$/
const rgbRegex = /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/i
const rgbaRegex = /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i
const hslRegex = /^hsl\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*\)$/i
const hslaRegex = /^hsla\(\s*(\d{0,3}[.]?[0-9]+)\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*(\d{1,3}[.]?[0-9]?)%\s*,\s*([-+]?[0-9]*[.]?[0-9]+)\s*\)$/i

export const transparent = (color: string, alpha = 1) => {
  if (typeof color !== "string") return
  if (color === "transparent") return color

  if (color.match(hexRegex) || color.match(reducedHexRegex)) {
    let { red, green, blue } = {
      red: 0,
      green: 0,
      blue: 0,
    }

    if (color.match(hexRegex)) {
      red = parseInt(`${color[1]}${color[2]}`, 16)
      green = parseInt(`${color[3]}${color[4]}`, 16)
      blue = parseInt(`${color[5]}${color[6]}`, 16)
    }

    if (color.match(reducedHexRegex)) {
      red = parseInt(`${color[1]}${color[1]}`, 16)
      green = parseInt(`${color[2]}${color[2]}`, 16)
      blue = parseInt(`${color[3]}${color[3]}`, 16)
    }

    return transparent(`rgba(${red}, ${green}, ${blue}, 1)`, alpha)
  }

  if (color.match(rgbRegex)) {
    return insertString(
      color.replace("rgb", "rgba"),
      `, ${alpha}`,
      color.length - 1
    )
  }

  if (color.match(rgbaRegex)) {
    return color.replace(
      rgbaRegex,
      (_, red, green, blue) => `rgba(${red}, ${green}, ${blue}, ${alpha})`
    )
  }

  if (color.match(hslRegex)) {
    return insertString(
      color.replace("hsl", "hsla"),
      `, ${alpha * 100}`,
      color.length - 1
    )
  }

  if (color.match(hslaRegex)) {
    return color.replace(
      hslaRegex,
      (_, hue, saturation, lightness) =>
        `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha * 100})`
    )
  }
}
