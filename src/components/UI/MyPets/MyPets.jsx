import React from 'react'
import PropTypes from 'prop-types'
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
import OverlayTooltip from '../OverlayTooltip/OverlayTooltip'

import classes from './MyPets.module.scss'

const MyPets = ({ loading, pets, type, onEdit, onDelete }) => {
  const isAdopted = type === 'adopted'
  const header = isAdopted ? 'Adoptions' : 'Donations'
  const noPets = (
    <>
      <p>You haven't {isAdopted ? 'adopted' : 'donated'} any yet.</p>
      <Link to={`/${isAdopted ? 'adopt' : 'donate'}`}>
        {isAdopted ? 'Adopt' : 'Donate'} now
      </Link>
    </>
  )

  return (
    <>
      <h4 className='mb-4'>My {header}</h4>
      {!loading &&
        (!pets.length ? (
          noPets
        ) : (
          <div className={classes.cardsGrid}>
            {pets.map((pet) => {
              const imgSize = '60px'
              return (
                <Card key={pet.id}>
                  <Card.Body>
                    <Row>
                      <Col xs='auto' className='mb-2'>
                        <ImgContainer height={imgSize} width={imgSize}>
                          {pet.imgUrl && (
                            <Card.Img
                              src={pet.imgUrl}
                              alt='failed'
                              loading='lazy'
                            />
                          )}
                        </ImgContainer>
                      </Col>
                      <Col>
                        <Card.Title>{pet.name}</Card.Title>
                        <Card.Subtitle className='mb-2 text-muted'>
                          <small>
                            {pet.age} old {pet.personality.toLocaleLowerCase()}{' '}
                            {pet.breed}
                          </small>
                        </Card.Subtitle>
                      </Col>
                    </Row>
                    <Card.Text>
                      <>
                        Available from {toDateLocale(pet.dateAvailable)} at{' '}
                        {pet.location}.{' '}
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
                      <OverlayTooltip text='View'>
                        <Button
                          as={Link}
                          to={`adopt/${pet.id}`}
                          variant='outline-secondary'>
                          <FontAwesomeIcon icon='eye' size='sm' />
                        </Button>
                      </OverlayTooltip>
                      {!isAdopted && (
                        <OverlayTooltip text='Edit'>
                          <Button
                            variant='outline-secondary'
                            onClick={() => onEdit(pet.id)}>
                            <FontAwesomeIcon icon='edit' size='sm' />
                          </Button>
                        </OverlayTooltip>
                      )}
                      <OverlayTooltip text='Delete'>
                        <Button
                          variant='outline-secondary'
                          onClick={() => onDelete(pet.id)}>
                          <FontAwesomeIcon icon='trash' size='sm' />
                        </Button>
                      </OverlayTooltip>
                    </ButtonGroup>
                    <span>
                      {isAdopted ? (
                        <MyPetBadge variant='success'>Available</MyPetBadge>
                      ) : !pet.adopterUserId ? (
                        <MyPetBadge variant='warning'>
                          Awaiting adoption
                        </MyPetBadge>
                      ) : (
                        <MyPetBadge variant='danger'>
                          Adoption Requested
                        </MyPetBadge>
                      )}
                    </span>
                  </Card.Footer>
                </Card>
              )
            })}
          </div>
        ))}
    </>
  )
}

const donated = 'donated'
const adopted = 'adopted'
MyPets.propTypes = {
  loading: PropTypes.bool.isRequired,
  pets: PropTypes.array.isRequired,
  type: PropTypes.oneOf([adopted, donated]).isRequired,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func.isRequired,
}

export default MyPets
