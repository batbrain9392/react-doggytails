import React, { memo, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

import petService from '../../http/pet'

import ImgContainer from '../UI/ImgContainer/ImgContainer'

import classes from './TopPets.module.scss'

const TopPets = () => {
  const [topPets, setTopPets] = useState([])

  const getPets = async () => {
    try {
      const pets = await petService.fetchAllForAdoption(4)
      setTopPets(pets)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPets()
  }, [])

  return (
    <div className={classes.wrapper}>
      <Container>
        <h3 className='home-font mb-4'>Dogs available for adoption</h3>
        <Row>
          {topPets.map((pet) => (
            <Col xs={6} sm={3} key={pet.id} className='mb-3'>
              <Card>
                <ImgContainer height='200px'>
                  {pet.imgUrl && (
                    <Card.Img
                      variant='top'
                      src={pet.imgUrl}
                      alt='Unavailable'
                      loading='lazy'
                    />
                  )}
                </ImgContainer>
                <Card.Body>
                  <Card.Link as={Link} to={`/adopt/${pet.id}`}>
                    View details
                  </Card.Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  )
}

export default memo(TopPets)
