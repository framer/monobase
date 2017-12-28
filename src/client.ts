import * as React from "react";
import * as ReactDOM from "react-dom";

declare var window;
declare var document;
declare var __webpack_require__;

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

const hydrate = () => {
  for (let i = 0; i < module["i"]; i++) {
    const modules = __webpack_require__(i);

    for (let key of Object.keys(modules)) {
      // const dynamicComponent = modules[key]["dynamicComponent"];

      const { dynamicName, dynamicComponent } = modules[key];

      if (dynamicComponent && dynamicName) {
        hydrateComponent(dynamicName, dynamicComponent);
      }
    }
  }
};

const hydrateComponent = (name, Component) => {
  const elements = Array.prototype.slice.call(
    document.querySelectorAll(`[data-component='${name}']`)
  );

  if (elements) {
    console.log("hydrate", name, elements);
  }

  for (let element of elements) {
    ReactDOM.hydrate(React.createElement(Component), element);
  }
};

hydrate();
