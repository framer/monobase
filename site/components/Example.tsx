import * as React from "react";
import { styled } from "linaria/react";

const Section = styled.section`
  text-align: center;
  padding: 80px 10px;

  > h3 {
    font-size: 30;
    font-weight: 700;
    margin: 0;
    padding-bottom: 40;
    line-height: 1;
  }

  > div {
    text-align: center;
    display: flex;
    justify-content: center;
  }
`;

export const Example: React.FC<{ title: string }> = props => (
  <Section>
    <h3>{props.title}</h3>
    <div>{props.children}</div>
  </Section>
);
