import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

// import img from '../../../assets/img/dog.jpeg'

const PetCard = ({ pet, url }) => {
  return (
    <Card>
      <Card.Img variant='top' src={pet.imgUrl} />
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
  )
}

export default PetCard
