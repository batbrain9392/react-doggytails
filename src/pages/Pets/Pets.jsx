import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'

import petService from '../../http/pet'

const Pets = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const { url } = useRouteMatch()

  const getPets = async () => {
    const data = await petService.fetchAll()
    setPets(data)
    setLoading(false)
  }

  useEffect(() => {
    getPets()
  }, [])

  return (
    <>
      <h3>Pets</h3>
      {loading ? (
        'Loading...'
      ) : pets.length ? (
        pets.map(pet => (
          <div key={pet.id}>
            <pre>{JSON.stringify(pet, null, 2)}</pre>
            <Link to={`${url}/${pet.id}`}>view details</Link>
          </div>
        ))
      ) : (
        <p>
          There are no pets up for adoption now. <br />
          Please come back later.
        </p>
      )}
    </>
  )
}

export default Pets
