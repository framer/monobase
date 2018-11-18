import * as React from "react";

import styled from "styled-components";

const Button = styled.div`
  display: inline-block;
  margin: 0 10px;
  padding: 24px 50px 26px;
  user-select: none;
  border-radius: 8px;
  border: 0;
  outline: 0;
  line-height: 1;
  font-size: 24px;
  background: #0af;
  color: #fff;
  &:hover {
    background: #555;
  }
`;

function Styled(props) {
  return (
    <div>
      <Button>Example</Button>
      <Button>Styled</Button>
      <Button>Component</Button>
    </div>
  );
}

export default Styled;
