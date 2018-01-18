import * as React from "react";
import { pill } from "components/theme";

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
  yellow: { backgroundColor: "papayawhip" },
  blue: { backgroundColor: "blue" }
};

// You can merge the styles nicely with the spread operater
function CSSComponent(props) {
  return (
    <span
      style={{
        ...pill,
        ...padding.large,
        ...backgrounds.yellow,
        color: "hotpink",
        fontWeight: 500
      }}
    >
      Hello
    </span>
  );
}

export default CSSComponent;
