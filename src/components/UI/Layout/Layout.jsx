import React from 'react'
import Container from 'react-bootstrap/Container'

import Appbar from '../Appbar/Appbar'
import Footer from '../Footer/Footer'

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      <Container as='main' className='Body'>
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
