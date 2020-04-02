import React, { useContext } from 'react'

import AuthContext from '../../../lib/auth-context'

import CustomNavLink from '../CustomNavLink/CustomNavLink'

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const handleClick = () => {
    logout()
  }

  const protectedNavLinks = isAuthenticated ? (
    <>
      <CustomNavLink to='/adopt'>adopt</CustomNavLink>
      <CustomNavLink to='/donate'>donate</CustomNavLink>
      <button onClick={handleClick}>logout</button>
    </>
  ) : (
    <CustomNavLink to='/auth'>auth</CustomNavLink>
  )

  return (
    <header>
      <CustomNavLink to='/' exact>
        home
      </CustomNavLink>
      <CustomNavLink to='/pets'>pets</CustomNavLink>
      {protectedNavLinks}
    </header>
  )
}

export default Header
