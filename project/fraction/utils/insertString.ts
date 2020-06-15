export const insertString = (
  original: string,
  insert: any,
  position: number
) => {
  return [
    original.slice(0, position + 1),
    insert,
    original.slice(position),
  ].join("")
}
