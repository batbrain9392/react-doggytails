import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

// import img from '../../../assets/img/dog.jpeg'

const PetDetailsView = ({ pet }) => {
  return (
    <Row>
      <Col md={5} className='mb-4'>
        <Image src={pet.imgUrl} thumbnail />
      </Col>
      <Col md={7} className='mb-4'>
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
        <p>
          <strong>DONOR NAME : </strong>
          {pet.donorName}
        </p>
        <p>
          <strong>DONOR PHONE : </strong>
          {pet.donorPhone}
        </p>
      </Col>
    </Row>
  )
}

export default PetDetailsView
