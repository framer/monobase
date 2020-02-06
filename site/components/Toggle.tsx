import * as React from "react"
import {styled} from "linaria/react"
import { Dynamic } from "monobase"

export type Props = {
  activeColor?: any
  inactiveColor?: any
  enabled?: boolean
}

export const StyledToggle = styled.span<Props & React.HTMLProps<HTMLSpanElement>>`
  display: block;
  position: relative;
  font-size: 14px;
  height: 24px;
  border-radius: 100px;
  cursor: pointer;
  width: 40px;
  background: ${props =>
    props.enabled ? "#05f" : "#f0f0f0"};
  box-shadow: inset 0 0 0 1px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease, box-shadow 0.2s ease;

  &:before {
    content: "";
    display: block;
    position: absolute;
    height: 18px;
    width: 18px;
    border-radius: 100%;
    top: 3px;
    left: ${props => (props.enabled ? "19px" : "3px")};
    background: #fff;
    transition: left 0.2s ease;
    will-change: left;
  }
`

type ToggleProps = {
    checked?: boolean
    onChange?: (value: boolean) => void
}


export const StaticToggle: React.FC<ToggleProps> = ({checked, onChange}) => {

    const [checkedState, setCheckedState] = React.useState(checked || false);
    const value = typeof checked === "undefined" ? checkedState : checked


    function handleChange() {
        const newValue = !value
        setCheckedState(newValue)
        if (onChange) onChange(newValue)
    }

    return <StyledToggle onClick={handleChange} enabled={value} />

}


export const Toggle = Dynamic(StaticToggle)