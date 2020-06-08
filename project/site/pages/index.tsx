import React, { CSSProperties } from "react"
import { Page } from "../components"
import {
  Aside,
  Content,
  Section,
  Heading,
  Text,
  Wireframe,
  Theme,
  variables,
  tokens,
} from "fraction"

const sectionStyle = {
  background: variables.color.pageBackground,
  paddingTop: variables.space[8],
  paddingBottom: variables.space[8],
}

const contentStyle = {
  background: "#05f",
  color: "#fff",
  paddingTop: variables.space[5],
  paddingBottom: variables.space[5],
}

export default () => {
  return (
    <Page tint={variables.palette.yellow} accent={variables.palette.green}>
      <Section style={sectionStyle}>
        <Content style={contentStyle} size="small">
          Small
        </Content>
        <Content style={contentStyle}>Default</Content>
        <Content style={contentStyle} size="large">
          Large
        </Content>
        <Content style={contentStyle} size="larger">
          Larger
        </Content>
        <Content style={contentStyle} size="larger">
          <Content style={{ ...contentStyle, background: "#07f" }} size="large">
            <Content style={{ ...contentStyle, background: "#09f" }}>
              <Content
                style={{ ...contentStyle, background: "#0af" }}
                size="small"
              >
                Stacked
              </Content>
            </Content>
          </Content>
        </Content>
      </Section>
      <Section style={sectionStyle}>
        <Aside aside={<div style={contentStyle}>Aside</div>}>
          <div style={contentStyle}>Content</div>
        </Aside>
      </Section>
      <Section
        style={sectionStyle}
        data-theme={Theme.Dark}
        data-navigation-theme={Theme.Dark}
        data-navigation-accent={tokens.palette.red}
      >
        <Content size="small">
          <Heading level={1}>
            Motion that works like magic. Motion that works like magic. Motion
            that works like magic.
          </Heading>
          <Heading level={2}>
            Motion that works like magic. Motion that works like magic. Motion
            that works like magic.
          </Heading>
          <Heading level={3}>
            Motion that works like magic. Motion that works like magic. Motion
            that works like magic.
          </Heading>
          <Heading level={4}>
            Motion that works like magic. Motion that works like magic. Motion
            that works like magic.
          </Heading>
          <Heading level={5}>
            Motion that works like magic. Motion that works like magic. Motion
            that works like magic.
          </Heading>
          <Heading level={6}>
            Motion that works like magic. Motion that works like magic. Motion
            that works like magic.
          </Heading>
        </Content>
      </Section>
      <Section
        style={
          {
            ...sectionStyle,
            background: "var(--page-tint)",
            "--fraction-color-textBody": "var(--fraction-palette-white)",
          } as CSSProperties
        }
        data-navigation-tint
      >
        <Content size="small">
          <Text size="smallest">
            Our component system was based on good old NPM packages, built by a
            local Node server wrangling dependencies—many days are Pirate Days
            in Framer engineering, with someone cursing “yarrrrn”.
          </Text>
          <Text size="smaller">
            Our component system was based on good old NPM packages, built by a
            local Node server wrangling dependencies—many days are Pirate Days
            in Framer engineering, with someone cursing “yarrrrn”.
          </Text>
          <Text size="small">
            Our component system was based on good old NPM packages, built by a
            local Node server wrangling dependencies—many days are Pirate Days
            in Framer engineering, with someone cursing “yarrrrn”.
          </Text>
          <Text>
            Our component system was based on good old NPM packages, built by a
            local Node server wrangling dependencies—many days are Pirate Days
            in Framer engineering, with someone cursing “yarrrrn”.
          </Text>
          <Text size="large">
            Our component system was based on good old NPM packages, built by a
            local Node server wrangling dependencies—many days are Pirate Days
            in Framer engineering, with someone cursing “yarrrrn”.
          </Text>
          <Text size="larger">
            Our component system was based on good old NPM packages, built by a
            local Node server wrangling dependencies—many days are Pirate Days
            in Framer engineering, with someone cursing “yarrrrn”.
          </Text>
          <Text size="largest">
            Our component system was based on good old NPM packages, built by a
            local Node server wrangling dependencies—many days are Pirate Days
            in Framer engineering, with someone cursing “yarrrrn”.
          </Text>
        </Content>
      </Section>
      <Wireframe />
    </Page>
  )
}
