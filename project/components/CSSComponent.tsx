import * as React from "react";

// Define some styles, you could put these in a central css.ts

// Declare an interface so autocomplete etc works
interface CSSCollection {
  [key: string]: React.CSSProperties;
}

const padding: CSSCollection = {
  small: { display: "inline-block", padding: 40 },
  large: { display: "inline-block", padding: 100 }
};

const backgrounds: CSSCollection = {
  yellow: { backgroundColor: "yellow" },
  blue: { backgroundColor: "blue" }
};

// You can merge the styles nicely with the spread operater
function CSSComponent(props) {
  return <div style={{ ...padding.small, ...backgrounds.yellow }}>Hello</div>;
}

export default CSSComponent;
