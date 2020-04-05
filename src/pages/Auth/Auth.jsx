import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import AuthContext from '../../lib/auth-context'

import TextInput from '../../components/UI/TextInput/TextInput'

const Auth = () => {
  const { signin, signup } = useContext(AuthContext)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const initialValues = {
    email: 'asd@asd.asd',
    password: '123456',
  }
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email addresss`').required('Required'),
    password: Yup.string()
      .min(6, 'Password has to be minimum 6 characters')
      .required('Required'),
  })

  const submitHandler = async ({ email, password }) => {
    try {
      setError(null)
      !isSignUp ? await signin(email, password) : await signup(email, password)
      history.replace(from)
    } catch (error) {
      setError(error)
    }
  }

  const switchHandler = () => {
    setError(null)
    setIsSignUp(!isSignUp)
  }

  return (
    <>
      <h3>{!isSignUp ? 'Sign in' : 'Sign up'}</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}>
        {({ isValid, isSubmitting }) => (
          <Form>
            <TextInput label='Email' name='email' type='text' />
            <TextInput label='Password' name='password' type='password' />
            <br />
            <Button
              variant='primary'
              type='submit'
              disabled={!isValid || isSubmitting}>
              {!isSubmitting ? (
                'Submit'
              ) : (
                <>
                  <Spinner
                    as='span'
                    animation='grow'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  <span className='ml-2'>Submitting...</span>
                </>
              )}
            </Button>
            <Button variant='link' type='button' onClick={switchHandler}>
              Switch to {!isSignUp ? 'Sign up' : 'Sign in'}
            </Button>
            {error && <p>{error}</p>}
          </Form>
        )}
      </Formik>
    </>
  )
}

export default Auth
