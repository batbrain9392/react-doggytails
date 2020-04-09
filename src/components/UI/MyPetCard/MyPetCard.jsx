import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { toDateLocale } from '../../../lib/util'

import ImgContainer from '../ImgContainer/ImgContainer'
import MyPetBadge from '../MyPetBadge/MyPetBadge'
import CustomTooltip from '../CustomTooltip/CustomTooltip'

import classes from './MyPetCard.module.scss'

const MyPetCard = ({ pet, isAdopted, onEdit, onDelete }) => {
  const imgSize = '60px'
  console.log(isAdopted)

  return (
    <Card>
      <Card.Body>
        <Row>
          <Col xs='auto' className='mb-2'>
            <ImgContainer height={imgSize} width={imgSize}>
              {pet.imgUrl && (
                <Card.Img src={pet.imgUrl} alt='failed' loading='lazy' />
              )}
            </ImgContainer>
          </Col>
          <Col>
            <Card.Title>{pet.name}</Card.Title>
            <Card.Subtitle className='mb-2 text-muted'>
              <small>
                {pet.age} old {pet.personality.toLocaleLowerCase()} {pet.breed}
              </small>
            </Card.Subtitle>
          </Col>
        </Row>
        <Card.Text>
          <>
            Available from {toDateLocale(pet.dateAvailable)} at {pet.location}.{' '}
            {isAdopted
              ? `Call ${pet.donorName} @ ${pet.donorPhone}.`
              : pet.adopterUserId
              ? `Call ${pet.adopterName} @ ${pet.adopterPhone}.`
              : ''}
          </>
        </Card.Text>
      </Card.Body>
      <Card.Footer className={classes.cardFooter}>
        <ButtonGroup size='sm'>
          <CustomTooltip text='View'>
            <Button
              as={Link}
              to={`adopt/${pet.id}`}
              variant='outline-secondary'>
              <FontAwesomeIcon icon='eye' size='sm' />
            </Button>
          </CustomTooltip>
          {!isAdopted && (
            <CustomTooltip text='Edit'>
              <Button
                variant='outline-secondary'
                onClick={() => onEdit(pet.id)}>
                <FontAwesomeIcon icon='edit' size='sm' />
              </Button>
            </CustomTooltip>
          )}
          <CustomTooltip text='Delete'>
            <Button
              variant='outline-secondary'
              onClick={() => onDelete(pet.id)}>
              <FontAwesomeIcon icon='trash' size='sm' />
            </Button>
          </CustomTooltip>
        </ButtonGroup>
        <span>
          {isAdopted ? (
            <MyPetBadge variant='success'>Available</MyPetBadge>
          ) : !pet.adopterUserId ? (
            <MyPetBadge variant='warning'>Awaiting adoption</MyPetBadge>
          ) : (
            <MyPetBadge variant='danger'>Adoption Requested</MyPetBadge>
          )}
        </span>
      </Card.Footer>
    </Card>
  )
}

export default memo(MyPetCard)
