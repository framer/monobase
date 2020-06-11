export const capitalize = (string: string) => {
  if (typeof string !== "string") return undefined

  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const uncapitalize = (string: string) => {
  if (typeof string !== "string") return undefined

  return string.charAt(0).toLowerCase() + string.slice(1)
}
