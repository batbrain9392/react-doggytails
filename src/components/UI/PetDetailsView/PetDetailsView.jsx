import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import img from '../../../assets/img/dog.jpeg'

const PetDetailsView = ({ pet }) => {
  return (
    <Row className='mb-2'>
      <Col md={5} className='mb-4'>
        <Image src={img} thumbnail />
      </Col>
      <Col md={7}>
        <p>
          <strong>NAME : </strong>
          {pet.name}
        </p>
        <p>
          <strong>BREED : </strong>
          {pet.breed}
        </p>
        <p>
          <strong>AGE : </strong>
          {pet.age}
        </p>
        <p>
          <strong>VACCINATION : </strong>
          {pet.vaccination}
        </p>
        <p>
          <strong>PERSONALITY : </strong>
          {pet.personality}
        </p>
        <p>
          <strong>FOOD PREFERENCE : </strong>
          {pet.foodPreference}
        </p>
        <p>
          <strong>DATE AVAILABLE : </strong>
          {pet.dateAvailable}
        </p>
        <p>
          <strong>LOCATION : </strong>
          {pet.location}
        </p>
        <p>
          <strong>DESCRIPTION : </strong>
          {pet.description}
        </p>
      </Col>
    </Row>
  )
}

export default PetDetailsView
