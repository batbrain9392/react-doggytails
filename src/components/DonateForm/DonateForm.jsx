import React from 'react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import { toDateInput } from '../../lib/util'

import TextInput from '../../components/UI/TextInput/TextInput'

const DonateForm = ({ edit, onSubmit }) => {
  if (edit) {
    edit.dateAvailable = toDateInput(edit.dateAvailable)
  }
  const initialValues = {
    name: edit?.name || '',
    breed: edit?.breed || '',
    age: edit?.age || '',
    vaccination: edit?.vaccination || '',
    personality: edit?.personality || '',
    foodPreference: edit?.foodPreference || '',
    dateAvailable: edit?.dateAvailable || '',
    location: edit?.location || '',
    imgUrl: edit?.imgUrl || '',
    description: edit?.description || '',
  }
  const validationSchema = Yup.object({
    name: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
    breed: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
    age: Yup.string().required('Required'),
    vaccination: Yup.string()
      .min(2, 'Minimum 2 characters')
      .required('Required'),
    personality: Yup.string().min(3, 'Minimum 3 characters'),
    foodPreference: Yup.string().min(3, 'Minimum 3 characters'),
    dateAvailable: Yup.date().typeError('Invalid date').required('Required'),
    location: Yup.string().min(3, 'Minimum 3 characters').required('Required'),
    imgUrl: Yup.string().url('Invalid url'),
    description: Yup.string()
      .min(3, 'Minimum 10 characters')
      .required('Required'),
  })

  const submitHandler = (formValues, { setSubmitting }) => {
    formValues.dateAvailable = new Date(formValues.dateAvailable).getTime()
    onSubmit(formValues, setSubmitting)
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={submitHandler}
      enableReinitialize>
      {({ isValid, isSubmitting, handleSubmit }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Col lg>
              <TextInput label='Name *' name='name' type='text' />
            </Col>
            <Col>
              <TextInput label='Breed *' name='breed' type='text' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col lg>
              <TextInput label='Age *' name='age' type='text' />
            </Col>
            <Col>
              <TextInput label='Vaccination *' name='vaccination' type='text' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col lg>
              <TextInput label='Personality' name='personality' type='text' />
            </Col>
            <Col>
              <TextInput
                label='Food Preference'
                name='foodPreference'
                type='text'
              />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col lg>
              <TextInput
                label='Date Available *'
                name='dateAvailable'
                type='date'
              />
            </Col>
            <Col>
              <TextInput label='Location *' name='location' type='text' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <TextInput label='Image Url' name='imgUrl' type='text' />
            </Col>
          </Form.Row>
          <Form.Row>
            <Col>
              <TextInput
                label='Description *'
                name='description'
                as='textarea'
              />
            </Col>
          </Form.Row>
          <Button
            variant='secondary'
            type='submit'
            disabled={!isValid || isSubmitting}
            className='mt-3'>
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
  )
}

export default DonateForm
