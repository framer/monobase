import React from "react";
import { Dynamic } from "monobase";
import { styled } from "linaria/react";

const StyledButton = styled.div`
  padding: 24px 50px 26px;
  user-select: none;
  border-radius: 8px;
  border: 0;
  outline: 0;
  line-height: 1;
  font-size: 24;
  background: blue;
  color: #fff;
`;

function Button() {
  const [count, setCount] = React.useState(0);
  const onClick = () => setCount(count + 1);
  return <StyledButton onClick={onClick}>Count: {count}</StyledButton>;
}

export default Dynamic(Button);
