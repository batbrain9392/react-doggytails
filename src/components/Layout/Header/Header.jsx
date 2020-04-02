import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'

import AuthContext from '../../../lib/auth-context'

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const handleClick = () => {
    logout()
  }

  const authNav = isAuthenticated ? (
    <>
      <NavLink to='/adopt'>adopt</NavLink>
      <NavLink to='/donate'>donate</NavLink>
      <button onClick={handleClick}>logout</button>
    </>
  ) : (
    <NavLink to='/auth'>auth</NavLink>
  )

  return (
    <header>
      <NavLink to='/' exact>
        home
      </NavLink>
      <NavLink to='/pets'>pets</NavLink>
      {authNav}
    </header>
  )
}

export default Header
