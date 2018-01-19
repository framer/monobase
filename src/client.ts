import * as React from "react";
import * as ReactDOM from "react-dom";

declare var window;
declare var document;
declare var __webpack_require__;

export const isDynamicComponent = Component => {
  return (
    typeof Component["dynamicName"] !== "undefined" &&
    typeof Component["dynamicComponent"] !== "undefined"
  );
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

const hydrate = () => {
  for (let i = 0; i < module["i"]; i++) {
    const modules = __webpack_require__(i);

    for (let key of Object.keys(modules)) {
      if (isDynamicComponent(modules[key])) {
        hydrateComponent(
          modules[key].dynamicName,
          modules[key].dynamicComponent
        );
      }
    }
  }
};

const hydrateComponent = (name, Component) => {
  const elements: HTMLElement[] = Array.prototype.slice.call(
    document.querySelectorAll(`[data-component='${name}']`)
  );

  if (elements) {
    console.info("monobase.hydrate", name, elements);
  }

  for (let element of elements) {
    const props = JSON.parse(element.getAttribute("data-component-props"));
    ReactDOM.hydrate(React.createElement(Component, props), element);
  }
};

hydrate();
