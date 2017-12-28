"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
// function isClassComponent(component) {
//   return typeof component === "function" &&
//     !!component.prototype.isReactComponent
//     ? true
//     : false;
// }
// function isFunctionComponent(component) {
//   return typeof component === "function" &&
//     String(component).includes("return React.createElement")
//     ? true
//     : false;
// }
// function isReactComponent(component) {
//   return isClassComponent(component) || isFunctionComponent(component)
//     ? true
//     : false;
// }
var hydrate = function () {
    for (var i = 0; i < module["i"]; i++) {
        var modules = __webpack_require__(i);
        for (var _i = 0, _a = Object.keys(modules); _i < _a.length; _i++) {
            var key = _a[_i];
            // const dynamicComponent = modules[key]["dynamicComponent"];
            var _b = modules[key], dynamicName = _b.dynamicName, dynamicComponent = _b.dynamicComponent;
            if (dynamicComponent && dynamicName) {
                hydrateComponent(dynamicName, dynamicComponent);
            }
        }
    }
};
var hydrateComponent = function (name, Component) {
    var elements = Array.prototype.slice.call(document.querySelectorAll("[data-component='" + name + "']"));
    if (elements) {
        console.log("hydrate", name, elements);
    }
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var element = elements_1[_i];
        ReactDOM.hydrate(React.createElement(Component), element);
    }
};
hydrate();
