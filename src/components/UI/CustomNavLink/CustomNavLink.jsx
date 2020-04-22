import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const CustomNavLink = ({ children, ...props }) => {
  return (
    <Nav.Link as={NavLink} activeClassName='active' {...props}>
      {children}
    </Nav.Link>
  )
}

export default memo(CustomNavLink)
