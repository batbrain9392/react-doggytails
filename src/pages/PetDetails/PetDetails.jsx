import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, useLocation, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Spinner from 'react-bootstrap/Spinner'

import AuthContext from '../../lib/auth-context'
import petService from '../../http/pet'

import PetDetailsView from '../../components/UI/PetDetailsView/PetDetailsView'

const PetDetails = () => {
  const [pet, setPet] = useState(null)
  const [loadingPet, setLoadingPet] = useState(true)
  const [adopting, setAdopting] = useState(false)
  const [adopted, setAdopted] = useState(false)
  const { id: petId } = useParams()
  const { isAuthenticated, token, userId } = useContext(AuthContext)
  const history = useHistory()
  const { pathname } = useLocation()

  const getPet = async (id) => {
    const data = await petService.fetchDetails(id)
    setPet(data)
    setLoadingPet(false)
  }

  useEffect(() => {
    getPet(petId)
  }, [petId])

  const signinHandler = () => {
    history.push('/auth', { from: pathname })
  }

  const adoptHandler = async () => {
    setAdopting(true)
    await petService.adopt(petId, userId, token)
    setAdopted(true)
  }

  const action = (pet) =>
    isAuthenticated ? (
      pet.adopterUserId ? (
        'This pet has already been adopted.'
      ) : pet.donorUserId === userId ? (
        'You cannot adopt your own donations.'
      ) : adopted ? (
        <>
          Congrats! It's yours.
          <Link to='/my-profile'>View my adoptions</Link>
        </>
      ) : (
        <>
          <Button variant='primary' onClick={adoptHandler}>
            Adopt
          </Button>
          {adopting && <p>Adopting...</p>}
        </>
      )
    ) : (
      <Button variant='primary' onClick={signinHandler}>
        Sign in to adopt
      </Button>
    )

  return (
    <>
      <h3>Details {loadingPet && <Spinner animation='grow' />}</h3>
      <div>
        {!loadingPet && !pet ? (
          <p>This ad has been removed.</p>
        ) : (
          <>
            <PetDetailsView pet={pet} />
            {action(pet)}
          </>
        )}
        <Link to='/adopt' className='ml-4'>
          View all pets
        </Link>
      </div>
    </>
  )
}

export default PetDetails
