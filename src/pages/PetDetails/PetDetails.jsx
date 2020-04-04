import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, useLocation, Link } from 'react-router-dom'

import AuthContext from '../../lib/auth-context'
import petService from '../../http/pet'

const PetDetails = () => {
  const [pet, setPet] = useState(null)
  const [loadingPet, setLoadingPet] = useState(true)
  const [adopting, setAdopting] = useState(false)
  const { id: petId } = useParams()
  const { isAuthenticated, token, userId } = useContext(AuthContext)
  const history = useHistory()
  const { pathname } = useLocation()

  const getPet = async id => {
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
    history.push('/my-profile')
  }

  const template = message => (
    <>
      <p>{message}</p>
      <Link to='/adopt'>view all pets</Link>
    </>
  )
  const action = pet =>
    isAuthenticated ? (
      pet.adopterUserId ? (
        template('This pet has already been adopted.')
      ) : pet.donorUserId === userId ? (
        template('You cannot adopt your own donations.')
      ) : (
        <>
          <button onClick={adoptHandler}>adopt</button>
          {adopting && <p>Adopting...</p>}
        </>
      )
    ) : (
      <button onClick={signinHandler}>signin to adopt</button>
    )

  return (
    <>
      <h3>Details</h3>
      <div>
        {loadingPet ? (
          'Loading...'
        ) : pet ? (
          <>
            <pre>{JSON.stringify(pet, null, 2)}</pre>
            {action(pet)}
          </>
        ) : (
          template('This ad has been removed.')
        )}
      </div>
    </>
  )
}

export default PetDetails
