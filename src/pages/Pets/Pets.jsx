import React, { useState, useEffect } from 'react'
import { useRouteMatch } from 'react-router-dom'

import petService from '../../http/pet'
import PetCard from '../../components/UI/PetCard/PetCard'

const Pets = () => {
  const [pets, setPets] = useState([])
  const [loading, setLoading] = useState(true)
  const { url } = useRouteMatch()

  const getPets = async () => {
    const data = await petService.fetchAllForAdoption()
    setPets(data)
    setLoading(false)
  }

  useEffect(() => {
    getPets()
  }, [])

  return (
    <>
      <h3>Adopt</h3>
      {loading ? (
        'Loading...'
      ) : pets.length ? (
        <section className='pet-grid'>
          {pets.map(pet => (
            <PetCard key={pet.id} pet={pet} url={url} />
          ))}
        </section>
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
