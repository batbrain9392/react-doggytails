import React from 'react'
import { useLocation } from 'react-router-dom'
import Container from 'react-bootstrap/Container'

import Appbar from '../Appbar/Appbar'
import Footer from '../UI/Footer/Footer'

import classes from './Layout.module.scss'

const Layout = ({ children }) => {
  const noContainer = useLocation().pathname === '/'

  return (
    <>
      <Appbar />
      {noContainer ? (
        children
      ) : (
        <Container as='main' className={classes.body}>
          {children}
        </Container>
      )}
      <Footer />
    </>
  )
}

export default Layout
