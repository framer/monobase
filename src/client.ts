import * as React from "react";
import * as ReactDOM from "react-dom";

declare var __webpack_require__;

export const isDynamicComponent = Component => {
  return (
    typeof Component["dynamicName"] !== "undefined" &&
    typeof Component["dynamicComponent"] !== "undefined"
  );
};

const getComponents = () => {
  const components = {};

  for (let i = 0; i < module["i"]; i++) {
    const modules = __webpack_require__(i);

    for (let key of Object.keys(modules)) {
      if (isDynamicComponent(modules[key])) {
        components[modules[key].dynamicName] = modules[key].dynamicComponent;
      }
    }
  }

  return components;
};

const querySelectorAll = (query: string): HTMLElement[] => {
  return Array.prototype.slice.call(document.querySelectorAll(query));
};

const hydrate = () => {
  const ComponentTagName = "component";
  const ComponentMap = getComponents();

  const createElement = (child: any[]) => {
    const [type, props, children] = child;

    return React.createElement(
      ComponentMap[type] || type,
      props,
      Array.isArray(children) ? children.map(createElement) : children
    );
  };

  for (let element of querySelectorAll(ComponentTagName)) {
    try {
      const props = ReactDOM.hydrate(
        createElement(JSON.parse(element.getAttribute("data-component-props"))),
        element
      );
    } catch (error) {
      console.error("Could not hydrate component", element, error);
    }
  }
};

document.addEventListener("DOMContentLoaded", hydrate);
