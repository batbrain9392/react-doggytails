import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

const CustomNavLink = ({ to, exact, children }) => {
  return (
    <Nav.Link as={NavLink} activeClassName='active' to={to} exact={exact}>
      {children}
    </Nav.Link>
  )
}

export default memo(CustomNavLink)
