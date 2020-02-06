import * as React from "react"
import { Checkmark } from "./icons"
import { StyledCheckbox } from "./style"

export type Props = React.HTMLAttributes<HTMLInputElement> & {
  checked?: boolean
  text?: string
  id: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  error?: boolean
  disabled?: boolean
}

export const Checkbox: React.FC<Props> = ({
  checked,
  disabled,
  error,
  id,
  onChange,
  text,
  ...inputProps
}) => (
  <StyledCheckbox error={error} disabled={disabled}>
    <span>
      {checked && Checkmark}
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        id={id}
        disabled={disabled}
        autoComplete="off"
        {...inputProps}
      />
    </span>
    {text && <label htmlFor={id}>{text}</label>}
  </StyledCheckbox>
)
