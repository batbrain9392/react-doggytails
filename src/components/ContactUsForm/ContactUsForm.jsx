import React, { useContext, useState } from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import AuthContext from '../../lib/auth-context'
import messageService from '../../http/message'

import TextInput from '../UI/TextInput/TextInput'
import CustomToast from '../UI/CustomToast/CustomToast'

const ContactUsForm = () => {
  const { userDetails } = useContext(AuthContext)
  const [show, setShow] = useState(false)

  const initialValues = {
    name: userDetails?.name || '',
    email: userDetails?.email || '',
    message: '',
  }
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
    email: Yup.string().email('Invalid email addresss').required('Required'),
    message: Yup.string().min(10, 'Minimum 10 characters').required('Required'),
  })

  const submitHandler = async (formValues, { setSubmitting, resetForm }) => {
    formValues = { ...formValues, timestamp: new Date().getTime() }
    try {
      await messageService.send(formValues)
      setShow(true)
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
      resetForm()
    }
  }

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={submitHandler}
        enableReinitialize>
        {({ isValid, isSubmitting, handleSubmit }) => (
          <Form noValidate onSubmit={handleSubmit}>
            <TextInput placeholder='Name *' name='name' type='text' />
            <TextInput placeholder='Email *' name='email' type='text' />
            <TextInput placeholder='Message *' name='message' as='textarea' />
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
          </Form>
        )}
      </Formik>
      <CustomToast show={show} setShow={setShow} className='mt-3'>
        Message sent!
      </CustomToast>
    </>
  )
}

export default ContactUsForm
