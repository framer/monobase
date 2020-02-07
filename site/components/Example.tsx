import * as React from "react";
import { styled } from "linaria/react";
import { Stack, StackProps } from "fraction";

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
  }
`;

export const Example: React.FC<{ title: string } & StackProps> = ({
  children,
  title,
  direction = "row",
  justifyContent = "center",
  alignItems = "center",
  ...rest
}) => (
  <Section>
    <h3>{title}</h3>
    <Stack
      direction={direction}
      justifyContent={justifyContent}
      alignItems={alignItems}
      {...rest}
    >
      {children}
    </Stack>
  </Section>
);
