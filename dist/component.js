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
exports.Dynamic = function (Component) {
    var componentName = "Component." + Component.name;
    // Todo: Maybe try React.createElement("Component")
    var f = function (props) {
        return React.createElement("component", {
            "data-component": componentName,
            "data-component-props": JSON.stringify(props)
        }, React.createElement(Component, __assign({ suppressHydrationWarning: true }, props)));
    };
    f["dynamicName"] = componentName;
    f["dynamicComponent"] = Component;
    return f;
};
