import * as React from "react";
import { styled } from "linaria/react";

const Section = styled.section`
  padding: 20px;
  border-bottom: 1px solid #eee;
  position: relative;

  > h3 {
    position: absolute;
    left: 20px;
    top: 20px;

    font-weight: 700;
    font-size: 12px;
    line-height: 1;
    text-transform: uppercase;
    color: #ccc;
  }

  > div {
    padding: 80px 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  > div > * {
    margin: 0 8px;
  }
`;

export const Example: React.FC<{ title: string }> = props => (
  <Section>
    <h3>{props.title}</h3>
    <div>{props.children}</div>
  </Section>
);
