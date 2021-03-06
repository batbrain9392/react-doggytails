import React, { useState, useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import AuthContext from '../../lib/auth-context'
import pet from '../../http/pet'

import Heading from '../../components/UI/Heading/Heading'
import Hr from '../../components/UI/Hr/Hr'
import SuccessModal from '../../components/UI/SuccessModal/SuccessModal'
import PetForm from '../../components/PetForm/PetForm'
import mascotRunning from '../../assets/img/mascotRunning.jpeg'

const Donate = () => {
  const { isAuthenticated, token, userId, userDetails } = useContext(
    AuthContext
  )
  const history = useHistory()
  const { pathname } = useLocation()
  const [error, setError] = useState(null)
  const [modalShow, setModalShow] = useState(false)

  const submitHandler = async (formValues, setSubmitting) => {
    setError(null)
    try {
      await pet.addForAdoption(
        {
          ...formValues,
          donorUserId: userId,
          donorName: userDetails.name,
          donorPhone: userDetails.phone,
        },
        token
      )
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
      <p>Thanks for donating your pet.</p>
      <p>
        This ad is already put on the home page. We will make sure that we get
        an adopter for you.
      </p>
    </SuccessModal>
  )

  return (
    <>
      <Heading>Donate</Heading>
      <Row>
        <Col md className='mb-5'>
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
      <Hr width='136px' />
      <Row>
        <Col md className='mb-4'>
          <h4 className='mb-4'>Post an Ad today to donate your furry friend</h4>
          We understand that giving up on your companion can be difficult but we
          are here to help. Simply fill the form on your right and we will help
          you find the desired new home for your dog.
        </Col>
        <Col>
          {isAuthenticated && (
            <>
              <PetForm onSubmit={submitHandler} />
              {error && <p>{error}</p>}
              {successModal}
            </>
          )}
        </Col>
      </Row>
    </>
  )
}

export default Donate
