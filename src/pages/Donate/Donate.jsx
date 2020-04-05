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
import pet from '../../http/pet'

import TextInput from '../../components/UI/TextInput/TextInput'

const Donate = () => {
  const { isAuthenticated, token, userId } = useContext(AuthContext)
  const history = useHistory()
  const { pathname } = useLocation()
  const [error, setError] = useState(null)
  const initialValues = {
    name: '',
    breed: '',
    age: '',
    vaccination: '',
    personality: '',
    foodPreference: '',
    dateAvailable: '',
    location: '',
    description: '',
  }
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, 'Name has to be minimum 3 characters')
      .required('Required'),
  })

  const submitHandler = async (formValues, { setSubmitting }) => {
    try {
      setError(null)
      const petId = await pet.addForAdoption(
        { ...formValues, donorUserId: userId },
        token
      )
      history.push(`/adopt/${petId}`)
    } catch (error) {
      setError(error)
    }
    setSubmitting(false)
  }

  const signinHandler = () => {
    history.push('/auth', { from: pathname })
  }

  return (
    <>
      <h3>Donate</h3>
      <Row>
        <Col md={6} className='mb-4'>
          <h5 className='mb-3'>Post an Ad today to donate your furry friend</h5>
          We understand that giving up on your companion can be difficult but we
          are here to help. Simply fill the form on your right and we will help
          you find the desired new home for your dog.
        </Col>
        <Col>
          {isAuthenticated ? (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={submitHandler}>
              {({ isValid, isSubmitting, handleSubmit }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <Form.Row>
                    <Col lg={6}>
                      <TextInput label='Name' name='name' type='text' />
                    </Col>
                    <Col>
                      <TextInput label='Breed' name='breed' type='text' />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col lg={6}>
                      <TextInput label='Age' name='age' type='text' />
                    </Col>
                    <Col>
                      <TextInput
                        label='Vaccination'
                        name='vaccination'
                        type='text'
                      />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col lg={6}>
                      <TextInput
                        label='Personality'
                        name='personality'
                        type='text'
                      />
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
                    <Col lg={6}>
                      <TextInput
                        label='Date Available'
                        name='dateAvailable'
                        type='text'
                      />
                    </Col>
                    <Col>
                      <TextInput label='Location' name='location' type='text' />
                    </Col>
                  </Form.Row>
                  <Form.Row>
                    <Col>
                      <TextInput
                        label='Description'
                        name='description'
                        type='text'
                      />
                    </Col>
                  </Form.Row>
                  <Button
                    variant='primary'
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
                        <span className='ml-2'>Donating...</span>
                      </>
                    )}
                  </Button>
                  {error && <p>{error}</p>}
                </Form>
              )}
            </Formik>
          ) : (
            <Button variant='primary' onClick={signinHandler}>
              Sign in to donate
            </Button>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Donate
