import React, { memo } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import classes from './Testimonials.module.scss'

const Testimonials = () => {
  return (
    <div className={classes.wrapper}>
      <Container>
        <Row>
          <Col md className={`${classes.border} pr-sm-4 pr-lg-5`}>
            <h3 className='home-font mb-4'>
              Matching two-legged human with a four-legged companion since 2020
            </h3>
            <p className='text-justify'>
              Our mission is to protect and improve the lives of dogs by
              providing a platform to match dogs up for adoption with potential
              humans look to adopt the dogs. Our mission is to create a
              community where every dog is treated with respect and compassion
              and has a permanent and loving home.
            </p>
            <p className='text-justify'>
              Through our platform, we inform and educate the public on the
              importance of a responsible pet owner. We serve as a new but
              rapidly growing dog adoption organization to help match dogs with
              humans looking for adoption.
            </p>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </div>
  )
}

export default memo(Testimonials)
