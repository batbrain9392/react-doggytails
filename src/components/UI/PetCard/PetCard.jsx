import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

import { toDateLocale } from '../../../lib/util'

import ImgContainer from '../ImgContainer/ImgContainer'

const PetCard = ({ pet, url, mine }) => {
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
        <Card.Title className='d-flex justify-content-between'>
          <span>{pet.name}</span>
          {mine && <Badge variant='warning'>mine</Badge>}
        </Card.Title>
        <Card.Subtitle className='mb-3 text-muted'>
          <small>{pet.breed}</small>
        </Card.Subtitle>
        <Card.Text>{pet.description}</Card.Text>
        <Link to={`${url}/${pet.id}`}>View details</Link>
      </Card.Body>
      <Card.Footer>
        <small className='text-muted'>
          Available from {toDateLocale(pet.dateAvailable)}
        </small>
      </Card.Footer>
    </Card>
  )
}

export default memo(PetCard)
