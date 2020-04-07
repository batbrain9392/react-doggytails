import React from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'

import ImgContainer from '../ImgContainer/ImgContainer'

const PetCard = ({ pet, url }) => {
  return (
    <Card>
      <ImgContainer height='250px'>
        {pet.imgUrl && (
          <Card.Img
            variant='top'
            src={pet.imgUrl}
            alt='Image unavailable'
            loading='lazy'
          />
        )}
      </ImgContainer>
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
