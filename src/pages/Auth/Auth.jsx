import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AuthContext from '../../lib/auth-context'

import TextInput from '../../components/UI/TextInput/TextInput'
import Heading from '../../components/UI/Heading/Heading'

const Auth = () => {
  const { signin, signup } = useContext(AuthContext)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }
  const initialValues = {
    email: '',
    password: '',
    name: '',
    phone: '',
  }
  let yupObject = {
    email: Yup.string().email('Invalid email addresss').required('Required'),
    password: Yup.string().min(6, 'Minimum 6 characters').required('Required'),
  }
  yupObject = !isSignUp
    ? yupObject
    : {
        ...yupObject,
        name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
        phone: Yup.number()
          .integer('Invalid phone number')
          .min(1000000000, 'Minimum 10 characters')
          .max(9999999999, 'Maximum 10 characters')
          .required('Required'),
      }
  const validationSchema = Yup.object(yupObject)

  const submitHandler = async ({ email, password, ...rest }) => {
    try {
      setError(null)
      !isSignUp
        ? await signin(email, password)
        : await signup(email, password, rest)
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
      <Heading>{!isSignUp ? 'Sign In' : 'Sign Up'}</Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}>
        {({ isValid, isSubmitting, handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <Row>
              <Col sm>
                <TextInput
                  label='Email'
                  name='email'
                  type='text'
                  checkValid={isSignUp}
                />
              </Col>
              <Col>
                <TextInput
                  label='Password'
                  name='password'
                  type='password'
                  checkValid={isSignUp}
                />
              </Col>
            </Row>
            {isSignUp && (
              <Row>
                <Col sm>
                  <TextInput
                    label='Name'
                    name='name'
                    type='text'
                    checkValid={isSignUp}
                  />
                </Col>
                <Col>
                  <TextInput
                    label='Phone'
                    name='phone'
                    type='number'
                    checkValid={isSignUp}
                  />
                </Col>
              </Row>
            )}
            <br />
            <Button
              variant='secondary'
              type='submit'
              disabled={!isValid || isSubmitting}>
              {!isSubmitting ? (
                !isSignUp ? (
                  'Sign in'
                ) : (
                  'Sign up'
                )
              ) : (
                <>
                  <Spinner
                    as='span'
                    animation='grow'
                    size='sm'
                    role='status'
                    aria-hidden='true'
                  />
                  <span className='ml-2'>
                    {!isSignUp ? 'Signing in' : 'Signing up'}
                  </span>
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
