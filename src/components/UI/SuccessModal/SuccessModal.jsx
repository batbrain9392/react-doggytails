import React, { memo } from 'react'
import { Link } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Image from 'react-bootstrap/Image'

import mascotSitting from '../../../assets/img/mascot_sitting.webp'

import classes from './SuccessModal.module.scss'

const SuccessModal = ({ title, children, ...rest }) => {
  return (
    <Modal {...rest} aria-labelledby='success-modal' centered>
      <Modal.Header closeButton>
        <Modal.Title id='success-modal'>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className={classes.grid}>
        <Image src={mascotSitting} className={classes.mascotImg} fluid />
        <div>
          {children}
          <Link to='/my-profile'>Review on profile</Link>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default memo(SuccessModal)
