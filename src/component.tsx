import * as React from "react";
import * as ComponentTree from "react-component-tree";

const serializeElement = child => {
  console.dir(child);
  return {
    type: serializeType(child),
    props: serializeProps(child.props),
    children: serializeChildren(child.props.children)
  };
};

const serializeType = child => {
  if (child.type && child.type.dynamicName) {
    return child.type.dynamicName;
  }
  if (typeof child.type == "string") {
    return child.type;
  }
  console.dir(child);
  throw Error(`Unknown type`);
};

const serializeChildren = children => {
  console.log("serializeChildren", typeof children, children);

  if (!children) {
    return [];
  }
  if (!Array.isArray(children)) {
    children = [children];
  }
  return children.map(serializeElement);
};

const serializeProps = props => {
  if (!props) {
    return null;
  }

  const propsCopy = Object.assign({}, props);
  delete propsCopy.children;

  return propsCopy;
};

export const Dynamic = Component => {
  const componentName = `Component.${Component.name}`;

  // Todo: Maybe try React.createElement("Component")

  console.log("Dynamic", componentName);

  const f = props => {
    const instance = <Component suppressHydrationWarning={true} {...props} />;

    console.dir(serializeElement({ type: componentName, props: props }));

    return React.createElement(
      "component",
      {
        "data-component": componentName,
        "data-component-props": JSON.stringify(
          serializeElement({ type: componentName, props: props })
        )
      },
      instance
    );
  };
  f["dynamicName"] = componentName;
  f["dynamicComponent"] = Component;

  return f;
};
