import React, { useContext } from 'react'

import AuthContext from '../../../lib/auth-context'

import CustomNavLink from '../CustomNavLink/CustomNavLink'

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const handleClick = () => {
    logout()
  }

  const protectedNavLinks = isAuthenticated ? (
    <button onClick={handleClick}>logout</button>
  ) : (
    <CustomNavLink to='/auth'>auth</CustomNavLink>
  )

  return (
    <header
      style={{
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'start',
        gap: '20px',
      }}>
      <CustomNavLink to='/' exact>
        home
      </CustomNavLink>
      <CustomNavLink to='/pets'>pets</CustomNavLink>
      <CustomNavLink to='/donate'>donate</CustomNavLink>
      {protectedNavLinks}
    </header>
  )
}

export default Header
