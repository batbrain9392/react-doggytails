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
      <CustomNavLink to='/my-profile'>My Profile</CustomNavLink>
      <button onClick={handleClick}>Logout</button>
    </>
  ) : (
    <CustomNavLink to='/auth'>Auth</CustomNavLink>
  )

  return (
    <header
      style={{
        display: 'grid',
        gridAutoFlow: 'column',
        justifyContent: 'start',
        gap: '20px',
      }}>
      {/* <CustomNavLink to='/' exact>
        Home
      </CustomNavLink> */}
      <CustomNavLink to='/adopt'>Adopt</CustomNavLink>
      <CustomNavLink to='/donate'>Donate</CustomNavLink>
      {protectedNavLinks}
    </header>
  )
}

export default Header
