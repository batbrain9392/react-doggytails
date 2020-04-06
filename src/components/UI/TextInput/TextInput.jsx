import React from 'react'
import { useField } from 'formik'
import Form from 'react-bootstrap/Form'

const TextInput = ({ name, label, checkValid = true, ...props }) => {
  const [field, meta] = useField(name)
  const { touched, error } = meta

  return (
    <Form.Group controlId={`${name}Control`}>
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        {...field}
        {...props}
        isInvalid={touched && !!error}
        isValid={checkValid && touched && !error}
      />
      <Form.Control.Feedback type='invalid'>{error}</Form.Control.Feedback>
    </Form.Group>
  )
}

export default TextInput
