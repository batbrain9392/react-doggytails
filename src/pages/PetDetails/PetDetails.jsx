import React, { useState, useEffect, useContext } from 'react'
import { useParams, useHistory, useLocation, Link } from 'react-router-dom'

import AuthContext from '../../lib/auth-context'
import petService from '../../http/pet'
import adoptionService from '../../http/adoption'

const PetDetails = () => {
  const [pet, setPet] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id: petId } = useParams()
  const { isAuthenticated, token, userId } = useContext(AuthContext)
  const history = useHistory()
  const { pathname } = useLocation()

  const getPet = async id => {
    const data = await petService.fetch(id)
    setPet(data)
    setLoading(false)
  }

  useEffect(() => {
    getPet(petId)
  }, [petId])

  const adoptHandler = () => {
    const adoption = {
      petId,
      adopterUserId: userId,
    }
    adoptionService.add(adoption, token)
  }

  const signinHandler = () => {
    history.push('/auth', { from: pathname })
  }

  return (
    <>
      <h3>Details</h3>
      <div>
        {loading ? (
          'Loading...'
        ) : pet ? (
          <>
            <pre>{JSON.stringify(pet, null, 2)}</pre>
            {isAuthenticated ? (
              <button onClick={adoptHandler}>adopt</button>
            ) : (
              <button onClick={signinHandler}>signin to adopt</button>
            )}
          </>
        ) : (
          <>
            <p>This ad has been removed.</p>
            <Link to='/adopt'>view all pets</Link>
          </>
        )}
      </div>
    </>
  )
}

export default PetDetails
