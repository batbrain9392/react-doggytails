import React, { useState, useContext } from 'react'
import { useHistory, useLocation, Link } from 'react-router-dom'
import { Formik } from 'formik'
import * as Yup from 'yup'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import AuthContext from '../../lib/auth-context'
import pet from '../../http/pet'

import TextInput from '../../components/UI/TextInput/TextInput'
import Heading from '../../components/UI/Heading/Heading'
import Hr from '../../components/UI/Hr/Hr'
import SuccessModal from '../../components/UI/SuccessModal/SuccessModal'
import mascotRunning from '../../assets/img/mascot_running.webp'

const Donate = () => {
  const { isAuthenticated, token, userId, userDetails } = useContext(
    AuthContext
  )
  const history = useHistory()
  const { pathname } = useLocation()
  const [error, setError] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const [petId, setPetId] = useState(null)
  const initialValues = {
    name: '',
    breed: '',
    age: '',
    vaccination: '',
    personality: '',
    foodPreference: '',
    dateAvailable: '',
    location: '',
    imgUrl: '',
    description: '',
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

  const submitHandler = async (formValues, { setSubmitting }) => {
    setError(null)
    try {
      const id = await pet.addForAdoption(
        {
          ...formValues,
          donorUserId: userId,
          donorName: userDetails.name,
          donorPhone: userDetails.phone,
        },
        token
      )
      setPetId(id)
      setModalShow(true)
    } catch (error) {
      setError(error)
    }
    setSubmitting(false)
  }

  const signinHandler = () => {
    history.push('/auth', { from: pathname })
  }

  const successModal = (
    <SuccessModal
      show={modalShow}
      onHide={() => setModalShow(false)}
      title='Donated'>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <p>
        Quam facilis iste perspiciatis debitis, sunt perferendis aliquam non
        maiores autem.
      </p>
      <Link to={`/adopt/${petId}`}>View donated pet</Link>
    </SuccessModal>
  )

  return (
    <>
      <Heading>Donate</Heading>
      <Row>
        <Col md={6} className='mb-5'>
          <h4 className='mb-4'>Find Your Pet A Loving Forever Home</h4>
          <p>
            You can be moving cities or crossing international borders your dog
            does not have to go to an animal shelter. We, here at DoggyTails,
            have made it our mission to find the next perfect home for your dog.
          </p>
          <p className='mb-5'>
            Rehoming your pet should be easy and stress-free both for you and
            your pet. Our experts at DoggyTails, the newest and most promising
            non-profit pet adoption platform, with support from amazing dog
            lovers around us, have created a simple, reliable, free website to
            help you place your pet from your loving home directly to another.
          </p>
          {!isAuthenticated && (
            <Button variant='secondary' onClick={signinHandler}>
              Sign in to donate
            </Button>
          )}
        </Col>
        <Col className='text-center'>
          <Image src={mascotRunning} alt='toon dog' fluid className='mb-5' />
        </Col>
      </Row>
      <Hr width='9.52vw' />
      <Row>
        <Col md={6} className='mb-4'>
          <h4 className='mb-4'>Post an Ad today to donate your furry friend</h4>
          We understand that giving up on your companion can be difficult but we
          are here to help. Simply fill the form on your right and we will help
          you find the desired new home for your dog.
        </Col>
        <Col>
          {isAuthenticated && (
            <>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={submitHandler}
                enableReinitialize>
                {({ isValid, isSubmitting, handleSubmit }) => (
                  <Form noValidate onSubmit={handleSubmit}>
                    <Form.Row>
                      <Col lg>
                        <TextInput placeholder='Name' name='name' type='text' />
                      </Col>
                      <Col>
                        <TextInput
                          placeholder='Breed'
                          name='breed'
                          type='text'
                        />
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col lg>
                        <TextInput placeholder='Age' name='age' type='text' />
                      </Col>
                      <Col>
                        <TextInput
                          placeholder='Vaccination'
                          name='vaccination'
                          type='text'
                        />
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col lg>
                        <TextInput
                          placeholder='Personality'
                          name='personality'
                          type='text'
                        />
                      </Col>
                      <Col>
                        <TextInput
                          placeholder='Food Preference'
                          name='foodPreference'
                          type='text'
                        />
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col lg>
                        <TextInput
                          placeholder='Date Available (mm/dd/yyyy)'
                          name='dateAvailable'
                          type='text'
                        />
                      </Col>
                      <Col>
                        <TextInput
                          placeholder='Location'
                          name='location'
                          type='text'
                        />
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col>
                        <TextInput
                          placeholder='Image Url'
                          name='imgUrl'
                          type='text'
                        />
                      </Col>
                    </Form.Row>
                    <Form.Row>
                      <Col>
                        <TextInput
                          placeholder='Description'
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
                        'Donate'
                      ) : (
                        <>
                          <Spinner
                            as='span'
                            animation='grow'
                            size='sm'
                            role='status'
                            aria-hidden='true'
                          />
                          <span className='ml-2'>Donating</span>
                        </>
                      )}
                    </Button>
                    {error && <p>{error}</p>}
                  </Form>
                )}
              </Formik>
              {successModal}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Donate
