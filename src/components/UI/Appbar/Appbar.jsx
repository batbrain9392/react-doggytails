import React, { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

import AuthContext from '../../../lib/auth-context'

import CustomNavLink from '../CustomNavLink/CustomNavLink'
import logo from '../../../assets/img/logo.webp'

import './Appbar.module.scss'

const Appbar = () => {
  const { isAuthenticated, logout } = useContext(AuthContext)
  const handleClick = () => {
    logout()
  }

  const protectedNavLinks = isAuthenticated ? (
    <>
      {/* <CustomNavLink to='/my-profile'>My Profile</CustomNavLink> */}
      <Button
        variant='link'
        as={Nav.Link}
        onClick={handleClick}
        className='ml-5'>
        Logout
      </Button>
    </>
  ) : (
    <CustomNavLink to='/auth'>Sign in / Sign up</CustomNavLink>
  )

  return (
    <Navbar bg='primary' variant='dark' expand='md' className='py-3 shadow'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          <Image alt='logo' src={logo} height='50' />
          <span
            className='align-bottom'
            style={{ fontFamily: '"Dancing Script",cursive' }}>
            DoggyTails
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='ml-auto'>
            {/* <CustomNavLink to='/' exact>
         Home
       </CustomNavLink> */}
            <CustomNavLink to='/adopt'>Adopt</CustomNavLink>
            <CustomNavLink to='/donate'>Donate</CustomNavLink>
            {protectedNavLinks}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Appbar
