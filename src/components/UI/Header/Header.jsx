import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'

import AuthContext from '../../../lib/auth-context'

import CustomNavLink from '../CustomNavLink/CustomNavLink'
import logo from '../../../logo.webp'

const Header = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const handleClick = () => {
    logout()
  }

  const protectedNavLinks = isAuthenticated ? (
    <>
      <CustomNavLink to='/my-profile'>MY PROFILE</CustomNavLink>
      <Button variant='link' as={Nav.Link} onClick={handleClick}>
        LOGOUT
      </Button>
    </>
  ) : (
    <CustomNavLink to='/auth'>AUTH</CustomNavLink>
  )

  return (
    <Navbar bg='dark' variant='dark' expand='md'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          <img alt='logo' src={logo} height='50' className='d-inline-block' />{' '}
          <span style={{ fontFamily: 'cursive' }}>DoggyTails</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {/* <CustomNavLink to='/' exact>
         Home
       </CustomNavLink> */}
            <CustomNavLink to='/adopt'>ADOPT</CustomNavLink>
            <CustomNavLink to='/donate'>DONATE</CustomNavLink>
            {protectedNavLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Header
