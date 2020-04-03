import React, { useState, useEffect } from 'react'
import { useRouteMatch, useParams, Link } from 'react-router-dom'

import petService from '../../http/pet'

const PetDetails = () => {
  const [pet, setPet] = useState([])
  const { url } = useRouteMatch()
  const { id } = useParams()

  const getPet = async petId => {
    const data = await petService.fetch(petId)
    setPet(data)
  }

  useEffect(() => {
    getPet(id)
  }, [id])

  return (
    <>
      <h3>Details</h3>
      <div>
        <pre>{JSON.stringify(pet, null, 2)}</pre>
        <Link to={`${url}/adopt`}>adopt</Link>
      </div>
    </>
  )
}

export default PetDetails
