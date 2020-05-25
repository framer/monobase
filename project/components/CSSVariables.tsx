import * as React from "react"

function getCssVariables(vars: any) {
    return Object.keys(vars).map((key) => `@value ${key}: ${vars[key]};`).join("\n")
}

function createMarkup(html: string) { return {__html: html}; };

export function CSSVariables({variables}: {variables: any}) {
    return <style dangerouslySetInnerHTML={createMarkup(getCssVariables(variables))}/>
}