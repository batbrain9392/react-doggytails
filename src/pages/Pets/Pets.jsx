import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'

import pet from '../../http/pet'

const Pets = () => {
  const [pets, setPets] = useState([])
  const { url } = useRouteMatch()

  const getPets = async () => {
    const data = await pet.fetchAll()
    setPets(data)
  }

  useEffect(() => {
    getPets()
  }, [])

  return (
    <>
      <h3>Pets</h3>
      {pets.map(pet => (
        <div key={pet.id}>
          <pre>{JSON.stringify(pet, null, 2)}</pre>
          <Link to={`${url}/${pet.id}`}>view details</Link>
        </div>
      ))}
    </>
  )
}

export default Pets
