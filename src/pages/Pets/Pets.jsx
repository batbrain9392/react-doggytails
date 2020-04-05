import React, { useState, useEffect } from 'react'
import { useRouteMatch, Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import ListGroupItem from 'react-bootstrap/ListGroupItem'

import petService from '../../http/pet'

import img from '../../dog.jpeg'

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
            <Card key={pet.id}>
              <Card.Img variant='top' src={img} />
              <Card.Body>
                <Card.Title>{pet.name}</Card.Title>
                <Card.Subtitle className='mb-3 text-muted'>
                  <small>{pet.breed}</small>
                </Card.Subtitle>
                <Card.Text>{pet.description}</Card.Text>
                <Link to={`${url}/${pet.id}`}>View details</Link>
              </Card.Body>
              <Card.Footer>
                <small className='text-muted'>
                  <strong>Date available: </strong> {pet.dateAvailable}
                </small>
              </Card.Footer>
            </Card>
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
