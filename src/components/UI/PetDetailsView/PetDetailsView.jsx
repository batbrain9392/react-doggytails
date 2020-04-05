import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import img from '../../../dog.jpeg'

const PetDetailsView = ({ pet }) => {
  return (
    <Row className='mb-4'>
      <Col md={5} className='mb-4'>
        <Image src={img} thumbnail />
      </Col>
      <Col md={7}>
        <pre>{JSON.stringify(pet, null, 2)}</pre>
      </Col>
    </Row>
  )
}

export default PetDetailsView
