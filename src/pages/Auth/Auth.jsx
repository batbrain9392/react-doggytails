import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

import AuthContext from '../../lib/auth-context'

import TextInput from '../../components/UI/TextInput/TextInput'

const Auth = () => {
  const { login } = useContext(AuthContext)
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const initialValues = {
    email: 'asd@asd.asd',
    password: '123456',
  }
  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email addresss`')
      .required('Required'),
    password: Yup.string()
      .min(6, 'Password has to be longer than 6 characters')
      .required('Required'),
  })

  const handleClick = () => {
    setTimeout(() => {
      login()
      history.replace(from)
    }, 1000)
  }

  return (
    <>
      <h3>Login</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleClick}>
        {({ isValid, isSubmitting }) => (
          <Form>
            <TextInput label='Email' name='email' type='text' />
            <TextInput label='Password' name='password' type='password' />
            <button type='submit' disabled={!isValid}>
              submit
            </button>
            {isSubmitting && <p>Logging in...</p>}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Auth
