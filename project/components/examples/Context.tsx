import * as React from "react";
import { Dynamic } from "monobase";

export const CountContext = React.createContext({ count: 1 });

function ContextCount() {
  const context = React.useContext(CountContext);
  return <div>Count: {context.count}</div>;
}

function ContextExample() {
  const [count, setCount] = React.useState(0);

  function onClick() {
    setCount(count + 1);
  }

  return (
    <CountContext.Provider value={{ count }}>
      <button onClick={onClick}>Update</button>
      <ContextCount />
      <ContextCount />
      <ContextCount />
    </CountContext.Provider>
  );
}

export default Dynamic(ContextExample);
