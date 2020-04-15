import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { toDateLocale } from '../../lib/util'

import ImgContainer from '../UI/ImgContainer/ImgContainer'
import MyPetBadge from '../UI/MyPetBadge/MyPetBadge'
import CustomTooltip from '../UI/CustomTooltip/CustomTooltip'
import FormModal from '../UI/FormModal/FormModal'

import classes from './MyPetCard.module.scss'

const MyPetCard = ({
  pet,
  isAdoption,
  onEdit,
  onDelete,
  onMarkAdopted,
  onMarkDonated,
}) => {
  const imgSize = '60px'

  const [formModalShow, setFormModalShow] = useState(false)
  const onSubmitHandler = (editedValues) => {
    setFormModalShow(false)
    onEdit(pet.id, editedValues)
  }
  const formModal = (
    <FormModal
      pet={pet}
      onSubmit={onSubmitHandler}
      show={formModalShow}
      onHide={() => setFormModalShow(false)}
    />
  )

  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const deleteModalEventHandler = (affirmative) => {
    setDeleteModalShow(false)
    if (affirmative) {
      onDelete(pet.id)
    }
  }
  const deleteModal = (
    <Modal
      size='sm'
      show={deleteModalShow}
      onHide={() => setDeleteModalShow(false)}
      aria-labelledby='deleteModal'
      centered>
      <Modal.Header>
        <Modal.Title id='deleteModal'>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer className='border-0'>
        <Button variant='danger' onClick={() => deleteModalEventHandler(true)}>
          Yes
        </Button>
        <Button
          variant='outline-secondary'
          onClick={() => deleteModalEventHandler(false)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  )

  const [markModalShow, setMarkModalShow] = useState(false)
  const markModalEventHandler = (affirmative) => {
    setMarkModalShow(false)
    if (affirmative) {
      isAdoption ? onMarkAdopted(pet.id) : onMarkDonated(pet.id)
    }
  }
  const markModal = (
    <Modal
      size='sm'
      show={markModalShow}
      onHide={() => setMarkModalShow(false)}
      aria-labelledby='markModal'
      centered>
      <Modal.Header>
        <Modal.Title id='markModal'>
          Mark as {isAdoption ? 'adopted' : 'donated'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>Are you sure?</Modal.Body>
      <Modal.Footer className='border-0'>
        <Button variant='success' onClick={() => markModalEventHandler(true)}>
          Yes
        </Button>
        <Button
          variant='outline-secondary'
          onClick={() => markModalEventHandler(false)}>
          No
        </Button>
      </Modal.Footer>
    </Modal>
  )
  const canBeManipulated = isAdoption
    ? !pet.isMarkedAdopted
    : !pet.isMarkedDonated

  const badge = pet.isMarkedDonated ? (
    <MyPetBadge variant='primary'>
      {isAdoption ? 'Adopted' : 'Donated'}
    </MyPetBadge>
  ) : pet.isMarkedAdopted ? (
    <MyPetBadge variant='warning'>Marked as adopted</MyPetBadge>
  ) : pet.adopterUserId ? (
    <MyPetBadge variant='success'>Adoption Requested</MyPetBadge>
  ) : (
    <MyPetBadge variant='dark'>Awaiting adoption</MyPetBadge>
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
            {isAdoption
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
              variant='outline-secondary'
              as={Link}
              to={`adopt/${pet.id}`}>
              <FontAwesomeIcon icon='eye' size='sm' />
            </Button>
          </CustomTooltip>
          {canBeManipulated && (
            <>
              {(isAdoption || pet.isMarkedAdopted) && (
                <>
                  <CustomTooltip
                    text={`Mark as ${isAdoption ? 'adopted' : 'donated'}`}>
                    <Button
                      variant='outline-secondary'
                      onClick={() => setMarkModalShow(true)}>
                      <FontAwesomeIcon icon='check' size='sm' />
                    </Button>
                  </CustomTooltip>
                  {markModal}
                </>
              )}
              {!isAdoption && (
                <>
                  <CustomTooltip text='Edit'>
                    <Button
                      variant='outline-secondary'
                      onClick={() => setFormModalShow(true)}>
                      <FontAwesomeIcon icon='edit' size='sm' />
                    </Button>
                  </CustomTooltip>
                  {formModal}
                </>
              )}
              <>
                <CustomTooltip text='Delete'>
                  <Button
                    variant='outline-secondary'
                    onClick={() => setDeleteModalShow(true)}>
                    <FontAwesomeIcon icon='trash' size='sm' />
                  </Button>
                </CustomTooltip>
                {deleteModal}
              </>
            </>
          )}
        </ButtonGroup>
        <span>{badge}</span>
      </Card.Footer>
    </Card>
  )
}

export default MyPetCard
