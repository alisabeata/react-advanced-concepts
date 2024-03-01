import React from 'react'
import classes from './Input.module.css'

const Input = ({
  isValid,
  name,
  value,
  type,
  label,
  onChange,
  onBlur,
}) => {
  return (
    <div className={`${classes.control} ${isValid ? '' : classes.invalid}`}>
      <label htmlFor={name}>{label}</label>
      <input
        type={type}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

export default Input
