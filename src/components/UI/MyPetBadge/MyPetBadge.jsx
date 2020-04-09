import React from 'react'
import Badge from 'react-bootstrap/Badge'

const MyPetBadge = ({ variant, children }) => {
  return (
    <Badge variant={variant} className='font-weight-normal'>
      {children}
    </Badge>
  )
}

export default MyPetBadge
