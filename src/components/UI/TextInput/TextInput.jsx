import React from 'react'
import { useField } from 'formik'

const TextInput = ({ name, label, ...props }) => {
  const [field, meta] = useField(name)
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} {...field} {...props} />
      {meta.touched && meta.error ? <div>{meta.error}</div> : null}
    </div>
  )
}

export default TextInput
