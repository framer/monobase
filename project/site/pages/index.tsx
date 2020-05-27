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
        <Content size="small">
          <div style={style}>Small</div>
        </Content>
        <Content>
          <div style={style}>Default</div>
        </Content>
        <Content size="large">
          <div style={style}>Large</div>
        </Content>
        <Content size="larger">
          <div style={style}>Larger</div>
        </Content>
        <Content size="larger">
          <div style={style}>
            <Content size="large">
              <div style={{ ...style, background: "#07f" }}>
                <Content>
                  <div style={{ ...style, background: "#09f" }}>
                    <Content size="small">
                      <div style={{ ...style, background: "#0af" }}>
                        Stacked
                      </div>
                    </Content>
                  </div>
                </Content>
              </div>
            </Content>
          </div>
        </Content>
      </Example>
    </Template>
  )
}
