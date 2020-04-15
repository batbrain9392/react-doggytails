import React, { useState, useEffect } from 'react'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import petService from '../../http/pet'

const AdminDataPets = ({ loading, setLoading }) => {
  const [pets, setPets] = useState([])

  useEffect(() => {
    const fetchAllPets = async () => {
      try {
        const data = await petService.fetchAll()
        setPets(data)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
    fetchAllPets()
  }, [setLoading])

  return loading ? (
    'Loading...'
  ) : !pets.length ? (
    'No ads posted'
  ) : (
    <>
      <h5 className='my-4'>
        Total ads for pets: <Badge variant='secondary'>{pets.length}</Badge>
      </h5>
      <Accordion defaultActiveKey={pets[0].id}>
        {pets.map((pet) => (
          <Card key={pet.id}>
            <Accordion.Toggle as={Card.Header} eventKey={pet.id}>
              {pet.name}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={pet.id}>
              <Card.Body>
                <pre>{JSON.stringify(pet, null, 2)}</pre>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        ))}
      </Accordion>
    </>
  )
}

export default AdminDataPets
