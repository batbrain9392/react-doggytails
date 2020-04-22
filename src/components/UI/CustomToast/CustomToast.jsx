import React, { memo } from 'react'
import Toast from 'react-bootstrap/Toast'

const CustomToast = ({ children, setShow, ...props }) => {
  return (
    <Toast onClose={() => setShow(false)} delay={3000} autohide {...props}>
      <Toast.Body>{children}</Toast.Body>
    </Toast>
  )
}

export default memo(CustomToast)
