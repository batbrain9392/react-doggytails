import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import mascotSitting from '../../../assets/img/mascot_sitting.webp'

import classes from './Banner.module.scss'

const Banner = () => {
  return (
    <Container className={classes.banner}>
      <Row>
        <Col sm className='mb-4 mb-sm-0'>
          <Image src={mascotSitting} alt='Image unavailable' fluid />
        </Col>
        <Col className={`${classes.text} home-font text-secondary`}>
          <div>
            <hr className='mb-3' />
            <hr className='mb-3' />
            <div className='mb-3'>
              GIVE UP FOR ADOPTION
              <br />
              or
              <br />
              ADOPT NOW!
            </div>
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
  )
}

export default memo(Banner)
