import * as React from "react";
import * as ReactDOM from "react-dom";

declare var window;
// declare var document;
declare var __webpack_require__;

if (typeof document === "undefined") {
  const document = {};
}

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

const COMPONENTS = getComponents();

const getParents = (element: HTMLElement) => {
  const elements: HTMLElement[] = [];

  while (element.parentNode) {
    element = element.parentNode as HTMLElement;
    elements.push(element);
  }

  return elements;
};

const hasParentComponent = (element: HTMLElement) => {
  for (let parent of getParents(element)) {
    if (parent.getAttribute && parent.getAttribute("data-component-props")) {
      return true;
    }
  }
  return false;
};

const reactize = child => {
  return React.createElement(
    COMPONENTS[child.type] || child.type,
    child.props,
    child.children.map(reactize)
  );
};

const querySelectorAll = (query: string): HTMLElement[] => {
  return Array.prototype.slice.call(document.querySelectorAll(query));
};

const main = () => {
  const elements = querySelectorAll("Component");

  for (let element of elements) {
    // if (hasParentComponent(element)) {
    //   continue;
    // }

    const props = JSON.parse(element.getAttribute("data-component-props"));

    console.log("hydrate", props.type, element);

    ReactDOM.hydrate(reactize(props), element);
  }
};

main();
