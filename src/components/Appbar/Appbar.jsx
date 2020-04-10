import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Image from 'react-bootstrap/Image'
import Spinner from 'react-bootstrap/Spinner'

import AuthContext from '../../lib/auth-context'

import CustomNavLink from '../UI/CustomNavLink/CustomNavLink'
import logo from '../../assets/img/logo.webp'

import classes from './Appbar.module.scss'

const Appbar = () => {
  const { isCheckingAuth, isAuthenticated, logout } = useContext(AuthContext)
  const history = useHistory()

  const handleClick = () => {
    logout()
    history.push('/auth')
  }

  const protectedNavLinks = isCheckingAuth ? (
    <Nav.Link className='ml-5' disabled>
      <Spinner animation='grow' size='sm' className='mr-1' />
      Authenticating
    </Nav.Link>
  ) : isAuthenticated ? (
    <>
      <CustomNavLink to='/my-profile'>My Profile</CustomNavLink>
      <Nav.Link onClick={handleClick}>Logout</Nav.Link>
    </>
  ) : (
    <CustomNavLink to='/auth'>Sign in / Sign up</CustomNavLink>
  )

  return (
    <Navbar
      bg='primary'
      variant='dark'
      expand='md'
      collapseOnSelect
      className='py-3 shadow'>
      <Container>
        <Navbar.Brand as={NavLink} to='/'>
          <Image alt='logo' src={logo} height='50' />
          <span className={`${classes.brandText} align-bottom`}>
            DoggyTails
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className={classes.navGrid}>
            <CustomNavLink to='/' exact>
              Home
            </CustomNavLink>
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
