import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import mascotHands from '../../../assets/img/mascotHands.jpeg'

import classes from './Banner.module.scss'

const Banner = () => {
  return (
    <div className={classes.wrapper}>
      <Container className={classes.container}>
        <Row>
          <Col sm className='mb-4 mb-sm-0'>
            <Image src={mascotHands} alt='Image unavailable' fluid />
          </Col>
          <Col className={`${classes.text} home-font`}>
            <div>
              <hr className='mb-3' />
              <hr className='mb-3' />
              <h1 className='mb-3'>
                GIVE UP FOR ADOPTION
                <br />
                or
                <br />
                ADOPT NOW!
              </h1>
              <div className={classes.linkContainer}>
                <hr />
                <hr className='mt-3' />
                <Button variant='secondary' as={Link} to='/adopt'>
                  <FontAwesomeIcon icon='chevron-right' />
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default memo(Banner)
