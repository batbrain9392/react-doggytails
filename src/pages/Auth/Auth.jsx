import React, { useState, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import AuthContext from '../../lib/auth-context'

import TextInput from '../../components/UI/TextInput/TextInput'
import Heading from '../../components/UI/Heading/Heading'
import mascotSitting from '../../assets/img/mascot_sitting.webp'

import classes from './Auth.module.scss'

const Auth = () => {
  const { authenticate } = useContext(AuthContext)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState(null)
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/adopt' } }
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

  const submitHandler = async ({ email, password, ...signupObj }) => {
    try {
      setError(null)
      const creds = { email, password, from }
      !isSignUp
        ? await authenticate(creds)
        : await authenticate({ ...creds, signupObj })
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
      <Row>
        <Col sm className='mb-5 mb-sm-0'>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={submitHandler}>
            {({ isValid, isSubmitting, handleSubmit }) => (
              <Form noValidate onSubmit={handleSubmit}>
                <TextInput
                  label={`Email ${isSignUp ? '*' : ''}`}
                  name='email'
                  type='text'
                  checkValid={isSignUp}
                />
                <TextInput
                  label={`Password ${isSignUp ? '*' : ''}`}
                  name='password'
                  type='password'
                  checkValid={isSignUp}
                />
                {isSignUp && (
                  <>
                    <TextInput
                      label='Name *'
                      name='name'
                      type='text'
                      checkValid={isSignUp}
                    />
                    <TextInput
                      label='Phone *'
                      name='phone'
                      type='number'
                      checkValid={isSignUp}
                    />
                  </>
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
                {error && <div className='mt-4 text-danger'>{error}</div>}
              </Form>
            )}
          </Formik>
        </Col>
        <Col className='text-center'>
          <Image src={mascotSitting} className={classes.mascotImg} fluid />
        </Col>
      </Row>
    </>
  )
}

export default Auth
