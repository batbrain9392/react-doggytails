import React, { memo } from 'react'
import Modal from 'react-bootstrap/Modal'
// import Image from 'react-bootstrap/Image'

// import mascotSitting from '../../../assets/img/mascot_sitting.webp'

// import classes from './ForgotPasswordModal.module.scss'

const ForgotPasswordModal = ({ title, children, ...rest }) => {
  return (
    <Modal {...rest} aria-labelledby='success-modal' centered>
      <Modal.Header closeButton>
        <Modal.Title id='success-modal'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  )
}

export default memo(ForgotPasswordModal)
