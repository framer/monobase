import {styled} from "linaria/react"

type Props = {
  error?: boolean
  disabled?: boolean
}

export const StyledCheckbox = styled.span<Props>`
  display: inline-flex;
  align-items: flex-start;
  box-sizing: border-box;
  padding: 0;
  opacity: ${props => (props.disabled ? 0.5 : 1)};

  span {
    position: relative;
  }

  label {
    color: #000;
    cursor: default;
    font-size: 14px;
    line-height: 1.5;
    padding-left: 12px;
    text-align: left;
    margin-top: -5px;
    transition: 0.2s color;
    user-select: none;
  }

  svg {
    position: absolute;
    left: 2px;
    top: 2px;
    z-index: 10;
    pointer-events: none;
  }

  input {
    position: relative;
    display: flex;
    width: 12px;
    height: 12px;
    border-radius: 2px;
    border: 1px solid #999;
    background-color: #f0f0f0;
    appearance: none;
    background-repeat: no-repeat;
    background-position: center;
    transition: all 0.2s ease;
    flex-shrink: 0;
    outline: 0;
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    line-height: 1;
  }

  input:checked {
    background: #05f;
    border-color: #04f;
  }

  input:focus {
    border-color: #05f;
  }
`
