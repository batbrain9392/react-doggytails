import React, { memo } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'

import jamie from '../../../assets/img/jamie.webp'
import mary from '../../../assets/img/mary.webp'
import smith from '../../../assets/img/smith.webp'

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
          <Col className='pl-sm-4 pl-lg-5 mt-5 mt-md-0'>
            <Row>
              <Col xs='auto'>
                <Image src={jamie} alt='img' roundedCircle />
              </Col>
              <Col>
                <h5 className='home-font'>Jamie</h5>
                ​I was looking for dog adoption and stumbled upon this amazing
                website. Within a week I was able to meet the previous owners of
                my dog and complete the ownership transfer formalities. Thank
                you, DoggyTails.
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col xs='auto'>
                <Image src={mary} alt='img' roundedCircle />
              </Col>
              <Col>
                <h5 className='home-font'>Mary</h5>
                ​I was growing too old to take care of Lucy on my own. I did not
                want my dog to live a life of animal shelter but DoggyTails
                helped me find new home for Lucy. I can even go meet her every
                other weekend.
              </Col>
            </Row>
            <Row className='mt-4'>
              <Col xs='auto'>
                <Image src={smith} alt='img' roundedCircle />
              </Col>
              <Col>
                <h5 className='home-font'>Smith Family</h5>
                Our little boy couldn't stop jumping from joy after meeting
                Bruno! Bruno is the most well behaved dog and is exceptional
                with kids. Thanks to his previous owners for trainings and all
                the love they gave to Bruno!
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default memo(Testimonials)
