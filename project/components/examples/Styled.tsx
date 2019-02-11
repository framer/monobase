import * as React from "react";

import styled, { ThemeProvider } from "styled-components";
import { Dynamic } from "monobase";

// Define our button
const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /* Color the border and text with theme.main */
  color: ${props => props.theme.main};
  border: 2px solid ${props => props.theme.main};
`;

// Define what main theme will look like
const theme = {
  main: "mediumseagreen"
};

const ButtonB = styled.button<{ error: boolean }>`
  background: ${props => (props.error ? "#F44" : "#09F")};
  border-radius: 4px;
  border: none;
  color: #fff;
  font-size: 1em;
  margin: 1em;
  outline: 0;
  padding: 0.25em 1em;
`;

function ErrorButton() {
  const [error, setError] = React.useState(false);

  function handleClick() {
    setError(!error);
  }

  return (
    <ButtonB onClick={handleClick} error={error}>
      Click Error
    </ButtonB>
  );
}

function Styled(props) {
  return (
    <div>
      <div>
        <ErrorButton />
        <Button theme={{ main: "royalblue" }}>Ad hoc theme</Button>
        <ThemeProvider theme={theme}>
          <div>
            <Button>Themed</Button>
            <Button theme={{ main: "darkorange" }}>Overidden</Button>
          </div>
        </ThemeProvider>
      </div>
    </div>
  );
}

export default Dynamic(Styled);
