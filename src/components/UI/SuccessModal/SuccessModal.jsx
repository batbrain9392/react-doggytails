import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const SuccessModal = ({
  title = 'Success',
  children = <p>Transaction complete</p>,
  ...rest
}) => {
  return (
    <Modal {...rest} aria-labelledby='success-modal' centered>
      <Modal.Header>
        <Modal.Title id='success-modal' className='mx-auto mx-sm-0'>
          {title}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button onClick={rest.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default SuccessModal
