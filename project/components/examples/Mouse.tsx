import * as React from "react";
import { Dynamic } from "monobase";
import { pill } from "components/theme";

declare var document;

const style: React.CSSProperties = {
  ...pill,
  fontFamily: "monospace",
  background: "white",
  border: "1px solid #F0F0F0",
};

function useWindowEvent(event, handler, passive = false) {
  React.useEffect(() => {
    window.addEventListener(event, handler, passive);
    return function cleanup() {
      window.removeEventListener(event, handler);
    };
  });
}

function Mouse() {
  const [point, setPoint] = React.useState({ x: 0, y: 0 });

  useWindowEvent("mousemove", (event) =>
    setPoint({ x: event.clientX, y: event.clientY })
  );

  return (
    <button style={style}>
      {point.x}, {point.y}
    </button>
  );
}

// class Mouse extends React.Component {
//   point = { x: 0, y: 0 };

//   componentDidMount() {
//     document.addEventListener("mousemove", this.onMouseMove);
//   }

//   onMouseMove = (event) => {
//     this.point = { x: event.clientX, y: event.clientY };
//     this.forceUpdate();
//   };

//   render() {
//     return (
//       <button style={style}>
//         {this.point.x}, {this.point.y}
//       </button>
//     );
//   }
// }

export default Dynamic(Mouse);
