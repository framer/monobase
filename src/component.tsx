import * as React from "react";
import * as utils from "./utils";

// function hashString(str) {
//   let hash = 5381,
//     i = str.length;

//   while (i) {
//     hash = (hash * 33) ^ str.charCodeAt(--i);
//   }

//   /* JavaScript does bitwise operations (like XOR, above) on 32-bit signed
//    * integers. Since we want the results to be always positive, convert the
//    * signed int to an unsigned by doing an unsigned bitshift. */
//   return hash >>> 0;
// }

// const getHash = (f: Function) => {
//   return hashString(f.toString());
// };

export const Dynamic = Component => {
  // const name = `${Component.name}-${getHash(Component)}`;

  const f = props => {
    return (
      <span data-component={Component.name}>
        <Component suppressHydrationWarning={true} {...props} />
      </span>
    );
  };
  f["dynamicName"] = Component.name;
  f["dynamicComponent"] = Component;

  return f;
};
