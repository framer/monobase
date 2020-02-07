import * as React from "react";
import { styled } from "linaria/react";

const Section = styled.section`
  text-align: center;
  padding: 80px 10px;

  > h3 {
    margin: 0;
    padding-bottom: 40;

    font-weight: 700;
    line-height: 1;
    font-size: 30;
    letter-spacing: -1px;
  }

  > div {
    display: flex;
    justify-content: center;
    text-align: center;
  }

  > div > * {
    margin: 0 10px;
  }
`;

export const Example: React.FC<{ title: string }> = props => (
  <Section>
    <h3>{props.title}</h3>
    <div>{props.children}</div>
  </Section>
);
