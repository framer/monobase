import * as React from "react";
import * as ReactDOM from "react-dom";
import { getDynamicComponents } from "./component";

const querySelectorAll = (query: string): HTMLElement[] => {
  return Array.prototype.slice.call(document.querySelectorAll(query));
};

const hydrate = () => {
  const ComponentTagName = "component";
  const ComponentMap = getDynamicComponents();

  const createElement = (child: any[]) => {
    const [type, props, children] = child;

    if (!ComponentMap[type]) {
      console.warn(`Could not find dynamic component for: ${type}`);
      console.warn(`Did you wrap the component in Dynamic()?`);
      console.info("Dynamic components:", ComponentMap);
      return null;
    }

    return React.createElement(
      ComponentMap[type],
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
