import React from "react"
import { Template } from "components/Template"
import { Content } from "fraction"
import { Example } from "components/Example"

const style = {
  background: "#05f",
  color: "#fff",
  borderRadius: 20,
  height: 100,
}

export function render() {
  return (
    <Template>
      <Example title="Content" direction="column" spacing={50}>
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
      </Example>
    </Template>
  )
}
