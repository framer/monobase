"use strict";
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
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
exports.Dynamic = function (Component) {
    // const name = `${Component.name}-${getHash(Component)}`;
    var f = function (props) {
        return (React.createElement("span", { "data-component": Component.name },
            React.createElement(Component, __assign({ suppressHydrationWarning: true }, props))));
    };
    f["dynamicName"] = Component.name;
    f["dynamicComponent"] = Component;
    return f;
};
