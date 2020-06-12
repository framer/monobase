export interface Path {
  location: string
  file: string
  extension: string
  parameters: string
}

export const parsePath = (path: string): Path => {
  const [, location, file, extension, parameters] = path
    .replace(/\\/g, "/")
    .match(/(.*\/)?(\..*?|.*?)(\.[^.]*?)?(#.*$|\?.*$|$)/) || [
    undefined,
    undefined,
    undefined,
    undefined,
  ]

  return {
    location,
    file,
    extension,
    parameters,
  }
}
