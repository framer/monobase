import * as React from "react";

export const Dynamic = Component => {
  const componentName = `Component.${Component.name}`;

  // Todo: Maybe try React.createElement("Component")

  const f = props => {
    return React.createElement(
      "component",
      {
        "data-component": componentName,
        "data-component-props": JSON.stringify(props)
      },
      <Component suppressHydrationWarning={true} {...props} />
    );
  };
  f["dynamicName"] = componentName;
  f["dynamicComponent"] = Component;

  return f;
};
