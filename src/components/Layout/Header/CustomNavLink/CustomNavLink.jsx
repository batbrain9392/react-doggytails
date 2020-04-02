import React from 'react'
import { NavLink } from 'react-router-dom'

const CustomNavLink = ({ to, exact, children }) => (
  <NavLink activeClassName='active' to={to} exact={exact}>
    {children}
  </NavLink>
)

export default CustomNavLink
