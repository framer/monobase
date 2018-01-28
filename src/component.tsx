import * as React from "react";
import * as PropTypes from "prop-types";

const serializeElement = element => {
  return [
    serializeType(element),
    serializeProps(element.props, element.key),
    serializeChildren(element.props.children)
  ];
};

const serializeType = child => {
  if (child.type && child.type.dynamicName) {
    return child.type.dynamicName;
  }

  if (typeof child.type === "string") {
    return child.type;
  }

  throw Error(`Unknown type`);
};

const serializeProps = (props, key?) => {
  if (!props) {
    return null;
  }

  const propsCopy = Object.assign({}, props);
  delete propsCopy.children;

  if (key) {
    propsCopy.key = key;
  }

  return propsCopy;
};

const serializeChildren = children => {
  if (!children) {
    return [];
  }

  if (typeof children === "string") {
    return children;
  }

  if (!Array.isArray(children)) {
    children = [children];
  }

  return children.map(serializeElement);
};

// Create a special dynamic wrapper so we can denote the root of a component tree
class DynamicContext extends React.Component {
  static childContextTypes = { __dynamic: PropTypes.bool };

  getChildContext() {
    return { __dynamic: true };
  }

  render() {
    return this.props.children;
  }
}

export const Dynamic = Component => {
  const componentName = `Component.${Component.name}`;

  const dynamicWrapper = (props, context?) => {
    // If there is a context, that likely means that we are a child in a component tree.
    if (context && context.__dynamic) {
      return <Component suppressHydrationWarning={true} {...props} />;
    }

    // If this is the root of a component tree, serialize the whole tree
    const serialized = JSON.stringify(
      serializeElement({ type: componentName, props: props })
    );

    return React.createElement(
      "component",
      {
        "data-component-props": serialized
      },
      <DynamicContext>
        <Component suppressHydrationWarning={true} {...props} />
      </DynamicContext>
    );
  };

  // Add some properties to the component so we can pick it up on the client side
  dynamicWrapper["dynamicName"] = componentName;
  dynamicWrapper["dynamicComponent"] = Component;
  dynamicWrapper["contextTypes"] = {
    __dynamic: PropTypes.bool
  };

  return dynamicWrapper;
};
