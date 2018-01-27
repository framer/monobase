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

console.log(COMPONENTS);

const hydrate = () => {
  for (let i = 0; i < module["i"]; i++) {
    const modules = __webpack_require__(i);

    for (let key of Object.keys(modules)) {
      if (isDynamicComponent(modules[key])) {
        hydrateComponent(modules[key].dynamicName, modules[key]);
      }
    }
  }
};

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
    if (parent.getAttribute && parent.getAttribute("data-component")) {
      return true;
    }
  }
  return false;
};

const reactize = child => {
  const el = COMPONENTS[child.type] || child.type;

  return React.createElement(el, child.props, child.children.map(reactize));
};

const hydrateComponent = (name, Component) => {
  const elements: HTMLElement[] = Array.prototype.slice.call(
    document.querySelectorAll(`[data-component='${name}']`)
  );

  if (elements) {
    console.info("monobase.hydrate", name, elements);
  }

  for (let element of elements) {
    if (hasParentComponent(element)) {
      continue;
    }

    const props = JSON.parse(element.getAttribute("data-component-props"));

    ReactDOM.hydrate(reactize(props), element);
  }
};

hydrate();
