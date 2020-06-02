import React from "react"
import { Page } from "../components"
import { Content, Heading, Text, Wireframe, spaceVariables } from "fraction"

const style = {
  background: "#05f",
  color: "#fff",
  paddingTop: spaceVariables[5],
  paddingBottom: spaceVariables[5],
}

export default () => {
  return (
    <Page>
      <Content style={style} size="small">
        Small
      </Content>
      <Content style={style}>Default</Content>
      <Content style={style} size="large">
        Large
      </Content>
      <Content style={style} size="larger">
        Larger
      </Content>
      <Content style={style} size="larger">
        <Content style={{ ...style, background: "#07f" }} size="large">
          <Content style={{ ...style, background: "#09f" }}>
            <Content style={{ ...style, background: "#0af" }} size="small">
              Stacked
            </Content>
          </Content>
        </Content>
      </Content>
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
      <Content size="small">
        <Text size="smallest">
          Our component system was based on good old NPM packages, built by a
          local Node server wrangling dependencies—many days are Pirate Days in
          Framer engineering, with someone cursing “yarrrrn”.
        </Text>
        <Text size="smaller">
          Our component system was based on good old NPM packages, built by a
          local Node server wrangling dependencies—many days are Pirate Days in
          Framer engineering, with someone cursing “yarrrrn”.
        </Text>
        <Text size="small">
          Our component system was based on good old NPM packages, built by a
          local Node server wrangling dependencies—many days are Pirate Days in
          Framer engineering, with someone cursing “yarrrrn”.
        </Text>
        <Text>
          Our component system was based on good old NPM packages, built by a
          local Node server wrangling dependencies—many days are Pirate Days in
          Framer engineering, with someone cursing “yarrrrn”.
        </Text>
        <Text size="large">
          Our component system was based on good old NPM packages, built by a
          local Node server wrangling dependencies—many days are Pirate Days in
          Framer engineering, with someone cursing “yarrrrn”.
        </Text>
        <Text size="larger">
          Our component system was based on good old NPM packages, built by a
          local Node server wrangling dependencies—many days are Pirate Days in
          Framer engineering, with someone cursing “yarrrrn”.
        </Text>
        <Text size="largest">
          Our component system was based on good old NPM packages, built by a
          local Node server wrangling dependencies—many days are Pirate Days in
          Framer engineering, with someone cursing “yarrrrn”.
        </Text>
      </Content>
      <Wireframe />
    </Page>
  )
}
