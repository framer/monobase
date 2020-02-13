import React from "react";
import { Button, CTA, colors, IconCTADownload, Text } from "fraction";
import { Example, Template, Toggle, ThemeToggle } from "components";

export default function render(project, styles) {
  return (
    <Template>
      <ThemeToggle />
      <Example title="Type" direction="column" gap={40}>
        <Text variant="h0" as="p">
          Header 0
        </Text>
        <Text variant="h1">Header 1</Text>
        <Text variant="h2">Header 2</Text>
        <Text variant="h4">Header 4</Text>
        <Text variant="h5">Header 5</Text>
        <Text variant="h6">Header 6</Text>
        <Text variant="body">Body</Text>
        <Text variant="small">Small</Text>
      </Example>
      <Example title="Toggle">
        <Toggle />
      </Example>
      <Example title="Button">
        <Button>Default</Button>
        <Button variant="primary">Important</Button>
        <Button variant="destructive">Dangerous</Button>
        <Button size="large">Large</Button>
      </Example>
      <Example title="Button Round">
        <Button round>Default</Button>
        <Button round variant="primary">
          Important
        </Button>
        <Button round variant="destructive">
          Dangerous
        </Button>
        <Button round size="large">
          Large
        </Button>
      </Example>
      <Example title="CTA" direction="column" gap={40}>
        <CTA href="#">Get started for free</CTA>
        <CTA href="#" tint={colors.purple100} iconSide="left">
          Back to framer.com
        </CTA>
        <CTA href="#" tint={colors.green110} icon={IconCTADownload}>
          Download for Desktop
        </CTA>
      </Example>
    </Template>
  );
}
