import React, { useState, useContext } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import AuthContext from '../../lib/auth-context'
import authService from '../../http/auth'

import TextInput from '../../components/UI/TextInput/TextInput'
import Heading from '../../components/UI/Heading/Heading'
import ForgotPasswordModal from '../../components/UI/ForgotPasswordModal/ForgotPasswordModal'
import mascotSitting from '../../assets/img/mascot_sitting.webp'

import classes from './Auth.module.scss'

const Auth = () => {
  const { authenticate } = useContext(AuthContext)
  const [isSignUp, setIsSignUp] = useState(false)
  const [isForgotPassword, setIsForgotPassword] = useState(false)
  const [error, setError] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const location = useLocation()
  const history = useHistory()
  const { from } = location.state || { from: { pathname: '/' } }
  const initialValues = {
    email: '',
    password: '',
    name: '',
    phone: '',
  }
  let yupObject = {
    email: Yup.string().email('Invalid email addresss').required('Required'),
  }
  yupObject = isForgotPassword
    ? yupObject
    : {
        ...yupObject,
        password: Yup.string()
          .min(6, 'Minimum 6 characters')
          .required('Required'),
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
      if (isForgotPassword) {
        await authService.sendPasswordResetEmail(email)
        setModalShow(true)
      } else {
        const creds = { email, password }
        signupObj = { email, ...signupObj }
        !isSignUp
          ? await authenticate(creds)
          : await authenticate({ ...creds, signupObj })
        history.replace(from)
      }
    } catch (error) {
      setError(error)
    }
  }

  const authSwitchHandler = () => {
    setError(null)
    if (isForgotPassword) {
      setIsForgotPassword(false)
      setIsSignUp(false)
    } else {
      setIsSignUp((val) => !val)
    }
  }

  const forgotPasswordSwitchHandler = () => {
    setError(null)
    setIsForgotPassword((val) => !val)
  }

  const modalCloseHandler = () => {
    setModalShow(false)
    setIsForgotPassword(false)
    setIsSignUp(false)
  }
  const modal = (
    <ForgotPasswordModal
      show={modalShow}
      onHide={modalCloseHandler}
      title='Mail sent'>
      <p>A password reset link has been sent to your email.</p>
      <p>
        Please follow the link on the mail to land on a password reset page.
        Upon entering the new password and submitting, your password will be
        reset. You can then come back and login with your new password.
      </p>
    </ForgotPasswordModal>
  )

  return (
    <>
      <Heading>
        {isForgotPassword
          ? 'Forgot Password'
          : !isSignUp
          ? 'Sign In'
          : 'Sign Up'}
      </Heading>
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
                {!isForgotPassword && (
                  <>
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
                  </>
                )}
                <div className='pt-2 pb-3'>
                  <Button
                    variant='secondary'
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
                        <span className='ml-2'>Submitting</span>
                      </>
                    )}
                  </Button>
                  {!isForgotPassword ? (
                    <Button
                      variant='link'
                      type='button'
                      onClick={forgotPasswordSwitchHandler}>
                      Forgot Password
                    </Button>
                  ) : (
                    modal
                  )}
                </div>
                <Button
                  variant='link'
                  type='button'
                  onClick={authSwitchHandler}
                  className='px-0'>
                  Switch to{' '}
                  {!isSignUp && !isForgotPassword ? 'Sign up' : 'Sign in'}
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
