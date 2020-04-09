import React, { memo } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import FooterIconLink from '../FooterIconLink/FooterIconLink'

const Footer = () => {
  return (
    <footer className='bg-primary text-white py-5 shadow-lg'>
      <Container>
        <small>
          <Row>
            <Col sm className='mb-3'>
              <FooterIconLink icon='copyright' type='r'>
                Developed by Team 24
              </FooterIconLink>
            </Col>
            <Col sm className='mb-3'>
              <FooterIconLink icon='twitter' type='b'>
                Follow us on Twitter
              </FooterIconLink>
            </Col>
            <Col sm className='mb-3'>
              <FooterIconLink icon='facebook-f' type='b'>
                Follow us on Facebook
              </FooterIconLink>
            </Col>
            <Col>
              <FooterIconLink icon='youtube' type='b'>
                Upcoming YouTube channel: Learn about the lives of adopted dogs
              </FooterIconLink>
            </Col>
          </Row>
        </small>
      </Container>
    </footer>
  )
}

export default memo(Footer)
