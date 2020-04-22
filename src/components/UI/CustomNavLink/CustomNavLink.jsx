import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav'

import classes from './CustomNavLink.module.scss'

const CustomNavLink = ({ to, exact, children }) => {
  return (
    <Nav.Link
      as={NavLink}
      activeClassName='active'
      to={to}
      exact={exact}
      className={classes.pad}>
      {children}
    </Nav.Link>
  )
}

export default memo(CustomNavLink)
