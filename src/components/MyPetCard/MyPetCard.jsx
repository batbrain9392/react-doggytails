import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { toDateLocale } from '../../lib/util'

import ImgContainer from '../UI/ImgContainer/ImgContainer'
import MyPetBadge from '../UI/MyPetBadge/MyPetBadge'
import CustomTooltip from '../UI/CustomTooltip/CustomTooltip'
import FormModal from '../UI/FormModal/FormModal'

import classes from './MyPetCard.module.scss'

const MyPetCard = ({ pet, isAdopted, onEdit, onDelete }) => {
  const imgSize = '60px'
  const [modalShow, setModalShow] = useState(false)

  const onSubmitHandler = (editedValues) => {
    setModalShow(false)
    onEdit(pet.id, editedValues)
  }

  const formModal = (
    <FormModal
      pet={pet}
      onSubmit={onSubmitHandler}
      show={modalShow}
      onHide={() => setModalShow(false)}
    />
  )

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
            <>
              <CustomTooltip text='Edit'>
                <Button
                  variant='outline-secondary'
                  onClick={() => setModalShow(true)}>
                  <FontAwesomeIcon icon='edit' size='sm' />
                </Button>
              </CustomTooltip>
              {formModal}
            </>
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

export default MyPetCard
