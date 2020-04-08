import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import mascotSitting from '../../../assets/img/mascot_sitting.webp'

const SuccessModal = ({
  title = 'Success',
  children = <p>Transaction complete</p>,
  ...rest
}) => {
  return (
    <Modal {...rest} aria-labelledby='success-modal' centered>
      <Modal.Header closeButton>
        <Modal.Title id='success-modal'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col sm className='mb-4 mb-sm-0 text-center'>
            <Image src={mascotSitting} className='modalImg' fluid />
          </Col>
          <Col>{children}</Col>
        </Row>
      </Modal.Body>
    </Modal>
  )
}

export default SuccessModal
