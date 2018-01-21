"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var ReactDOM = require("react-dom");
exports.isDynamicComponent = function (Component) {
    return (typeof Component["dynamicName"] !== "undefined" &&
        typeof Component["dynamicComponent"] !== "undefined");
};
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
            if (exports.isDynamicComponent(modules[key])) {
                hydrateComponent(modules[key].dynamicName, modules[key].dynamicComponent);
            }
        }
    }
};
var hydrateComponent = function (name, Component) {
    var elements = Array.prototype.slice.call(document.querySelectorAll("[data-component='" + name + "']"));
    if (elements) {
        console.info("monobase.hydrate", name, elements);
    }
    for (var _i = 0, elements_1 = elements; _i < elements_1.length; _i++) {
        var element = elements_1[_i];
        var props = JSON.parse(element.getAttribute("data-component-props"));
        ReactDOM.hydrate(React.createElement(Component, props), element);
    }
};
hydrate();
