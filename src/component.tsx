import * as React from "react";
import * as PropTypes from "prop-types";

const serializeElement = child => {
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

// Create a special dynamic wrapper so we can denote the root of a component tree
class DynamicContext extends React.Component {
  getChildContext() {
    return { __dynamic: true };
  }

  render() {
    return this.props.children;
  }
}

DynamicContext["childContextTypes"] = {
  __dynamic: PropTypes.bool
};

export const Dynamic = Component => {
  const componentName = `Component.${Component.name}`;

  // Todo: Maybe try React.createElement("Component")

  console.log("Dynamic", componentName);

  const f = (props, context) => {
    console.log("context", context);

    if (context.__dynamic) {
      return <Component suppressHydrationWarning={true} {...props} />;
    }

    const instance = (
      <DynamicContext>
        <Component suppressHydrationWarning={true} {...props} />
      </DynamicContext>
    );

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
  f["contextTypes"] = {
    __dynamic: PropTypes.bool
  };

  return f;
};
