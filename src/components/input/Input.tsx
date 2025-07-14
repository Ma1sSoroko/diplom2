import React from 'react'

type InputType = 'search'
interface InputProps {
    type: InputType
    id?: string
    label?: string
    name?: string
    checked?: boolean
    placeholder?: string
    className?: string
    value?: string
    rows?: number
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export function InputBase(props: InputProps): React.ReactElement {
    const { type, id, name, checked, placeholder, className, value, onChange } = props

    return (
        <input
            type={type}
            id={id}
            name={name}
            checked={checked}
            placeholder={placeholder}
            className={className || 'form-control'}
            value={value}
            onChange={onChange}
        />
    )
}

export const Input = InputBase