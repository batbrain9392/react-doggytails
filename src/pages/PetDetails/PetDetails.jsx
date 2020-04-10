import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import AuthContext from '../../lib/auth-context'
import petService from '../../http/pet'

import PetDetailsView from '../../components/UI/PetDetailsView/PetDetailsView'
import Heading from '../../components/UI/Heading/Heading'
import SuccessModal from '../../components/UI/SuccessModal/SuccessModal'

const PetDetails = () => {
  const [pet, setPet] = useState(null)
  const [loadingPet, setLoadingPet] = useState(true)
  const [adopting, setAdopting] = useState(false)
  const [adopted, setAdopted] = useState(null)
  const [modalShow, setModalShow] = useState(false)
  const { id: petId } = useParams()
  const { isAuthenticated, token, userId, userDetails } = useContext(
    AuthContext
  )
  const history = useHistory()
  const { pathname } = useLocation()

  const getPet = async (id) => {
    try {
      const data = await petService.fetchDetails(id)
      setPet(data)
    } catch (error) {
      console.log(error)
    }
    setLoadingPet(false)
  }

  useEffect(() => {
    getPet(petId)
  }, [petId])

  const signinHandler = () => {
    history.push('/auth', { from: pathname })
  }

  const adoptHandler = async () => {
    try {
      setAdopting(true)
      const adopter = {
        adopterUserId: userId,
        adopterName: userDetails.name,
        adopterPhone: userDetails.phone,
      }
      await petService.adopt(petId, adopter, token)
      setAdopted(adopter)
      setModalShow(true)
    } catch (error) {
      console.log(error)
    }
    setAdopting(false)
  }

  const successModalCloseHandler = () => {
    setModalShow(false)
    setPet({ ...pet, ...adopted })
  }
  const successModal = (
    <SuccessModal
      show={modalShow}
      onHide={successModalCloseHandler}
      title='Adopted'>
      <p>Congrats, you're on your way to get a new friend!</p>
      <p>
        Please call donor{' '}
        <strong>
          {pet?.donorName} @ {pet?.donorPhone}
        </strong>{' '}
        for further details.
      </p>
    </SuccessModal>
  )

  const action = () => {
    if (!isAuthenticated) {
      return (
        <Button variant='secondary' onClick={signinHandler} className='mr-3'>
          Sign in to adopt
        </Button>
      )
    }
    if (!pet.adopterUserId && pet.donorUserId !== userId) {
      return adopted ? (
        successModal
      ) : (
        <Button
          variant='secondary'
          onClick={adoptHandler}
          disabled={adopting}
          className='mr-3'>
          {!adopting ? (
            'Adopt'
          ) : (
            <>
              <Spinner
                as='span'
                animation='grow'
                size='sm'
                role='status'
                aria-hidden='true'
              />
              <span className='ml-2'>Adopting</span>
            </>
          )}
        </Button>
      )
    }
  }

  const onBackHandler = () => {
    history.goBack()
  }

  return (
    <>
      <Heading loading={loadingPet}>Pet Details</Heading>
      {!loadingPet &&
        (!pet ? (
          <p>This ad has been removed.</p>
        ) : (
          <>
            <PetDetailsView pet={pet} loggedInUser={userId} />
            {action()}
          </>
        ))}
      <Button variant='link' className='p-0' onClick={onBackHandler}>
        Go back
      </Button>
    </>
  )
}

export default PetDetails
