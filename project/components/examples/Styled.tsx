import * as React from "react";

import styled from "styled-components";

const Button = styled.div`
  display: inline-block;
  padding: 24px 50px 26px;
  user-select: none;
  border-radius: 8;
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
      <Button>Koen</Button>
      <Button>Is</Button>
      <Button>Gek</Button>
    </div>
  );
}

export default Styled;
