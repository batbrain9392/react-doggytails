import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, useLocation, Link } from 'react-router-dom'
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
  const [adopted, setAdopted] = useState(false)
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
      setAdopted(true)
      setModalShow(true)
    } catch (error) {
      console.log(error)
    }
    setAdopting(false)
  }

  const successModal = (
    <SuccessModal
      show={modalShow}
      onHide={() => setModalShow(false)}
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

  const action = (pet) =>
    isAuthenticated ? (
      pet.adopterUserId ? (
        <p>This pet has already been adopted.</p>
      ) : pet.donorUserId === userId ? (
        <p>You cannot adopt your own donations.</p>
      ) : adopted ? (
        <p>
          Adopted!
          {successModal}
        </p>
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
    ) : (
      <Button variant='secondary' onClick={signinHandler} className='mr-3'>
        Sign in to adopt
      </Button>
    )

  return (
    <>
      <Heading loading={loadingPet}>Pet Details</Heading>
      {!loadingPet &&
        (!pet ? (
          <p>This ad has been removed.</p>
        ) : (
          <>
            <PetDetailsView pet={pet} />
            {action(pet)}
          </>
        ))}
      <Link to='/adopt'>View all pets</Link>
    </>
  )
}

export default PetDetails
