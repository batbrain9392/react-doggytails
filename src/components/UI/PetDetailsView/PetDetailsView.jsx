import React, { memo } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Badge from 'react-bootstrap/Badge'

import { toDateLocale } from '../../../lib/util'

import ImgContainer from '../ImgContainer/ImgContainer'

import classes from './PetDetailsView.module.scss'

const PetDetailsView = ({ pet, loggedInUser }) => {
  return (
    <Row>
      <Col md={5} className='mb-5'>
        <ImgContainer>
          {pet.adopterUserId ? (
            <Badge variant='success' className={classes.badge}>
              taken
            </Badge>
          ) : (
            pet.donorUserId === loggedInUser && (
              <Badge variant='warning' className={classes.badge}>
                mine
              </Badge>
            )
          )}
          {pet.imgUrl && (
            <Image src={pet.imgUrl} alt='Image unavailable' thumbnail />
          )}
        </ImgContainer>
      </Col>
      <Col md={7} className={`${classes.details} mb-3`}>
        <Row>
          <Col as='p' lg>
            <strong>NAME : </strong>
            {pet.name}
          </Col>
          <Col as='p'>
            <strong>BREED : </strong>
            {pet.breed}
          </Col>
        </Row>
        <Row>
          <Col as='p' lg>
            <strong>AGE : </strong>
            {pet.age}
          </Col>
          <Col as='p'>
            <strong>VACCINATION : </strong>
            {pet.vaccination}
          </Col>
        </Row>
        <Row>
          <Col as='p' lg>
            <strong>PERSONALITY : </strong>
            {pet.personality}
          </Col>
          <Col as='p'>
            <strong>FOOD PREFERENCE : </strong>
            {pet.foodPreference}
          </Col>
        </Row>
        <Row>
          <Col as='p' lg>
            <strong>DATE AVAILABLE : </strong>
            {toDateLocale(pet.dateAvailable)}
          </Col>
          <Col as='p'>
            <strong>LOCATION : </strong>
            {pet.location}
          </Col>
        </Row>
        <Row>
          <Col as='p' lg>
            <strong>DONOR NAME : </strong>
            {pet.donorName}
          </Col>
          <Col as='p'>
            <strong>DONOR PHONE : </strong>
            {pet.donorPhone}
          </Col>
        </Row>
        <Row>
          <Col as='p' lg>
            <strong>DESCRIPTION : </strong>
            {pet.description}
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default memo(PetDetailsView)
