/* SRCSET
---------
A list of one or more strings separated by commas indicating a set of possible images represented by the source for the browser to use. Each string is composed of:

1. one URL to an image
2. a width descriptor, that is a positive integer directly followed by 'w'. The default value, if missing, is the infinity. 
3. a pixel density descriptor, that is a positive floating number directly followed by 'x'. The default value, if missing, is 1x.

Each string in the list must have at least a width descriptor or a pixel density descriptor to be valid. Among the list, there must be only one string containing the same tuple of width descriptor and pixel density descriptor.
The browser chooses the most adequate image to display at a given point of time.
The srcset attribute has an effect only when the <source> element is the direct child of a <picture> element. */

/* TYPE
-------
If the type attribute isn't specified, the media's type is retrieved from the server and checked to see if the user agent can handle it; if it can't be rendered, the next <source> is checked. If the type attribute is specified, it's compared against the types the user agent can present, and if it's not recognized, the server doesn't even get queried; instead, the next <source> element is checked at once. */

import * as React from "react";
interface Picture {
  src: string;
  alt?: string;
  extensions?: string[];
  hasRetina?: boolean;
  width?: number;
  height?: number;
}

export default ({
  src,
  width,
  height,
  alt,
  extensions,
  hasRetina = false
}: Picture) => {
  const name = src.split(".")[0];
  const base = `/static/images/`;
  const path = `${base}${name}`;
  const defaultExtension = src.split(".").pop();
  const attributes = { width, height, src, alt };

  const getSrcSet = (extension: string = defaultExtension) => {
    return hasRetina
      ? `${path}.${extension}, ${path}@2x.${extension} 2x`
      : `${path}.${extension}`;
  };

  return (
    <picture>
      {extensions
        ? extensions.map(extension => <source srcSet={getSrcSet(extension)} />)
        : null}
      <source srcSet={getSrcSet()} />
      <img {...attributes} />
    </picture>
  );
};
