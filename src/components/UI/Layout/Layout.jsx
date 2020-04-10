import React from 'react'
import Container from 'react-bootstrap/Container'

import Appbar from '../../Appbar/Appbar'
import Footer from '../Footer/Footer'

import classes from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      <Container as='main' className={classes.body}>
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
