import React from "react"
import { Page } from "../components"
import {
  spaceVariables,
  dimensionVariables,
  Content,
  Wireframe,
} from "fraction"

const style = {
  background: "#05f",
  color: "#fff",
  paddingTop: dimensionVariables.navigationBarHeight,
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
      <Wireframe />
    </Page>
  )
}
