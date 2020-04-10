import React from 'react'
import Modal from 'react-bootstrap/Modal'

import PetForm from '../../PetForm/PetForm'

// import classes from './SuccessModal.module.scss'

const FormModal = ({ pet, onSubmit, ...rest }) => {
  return (
    <Modal {...rest} aria-labelledby='form-modal' centered>
      <Modal.Header closeButton>
        <Modal.Title id='form-modal'>Edit Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <PetForm edit={pet} onSubmit={onSubmit} />
      </Modal.Body>
    </Modal>
  )
}

export default FormModal
