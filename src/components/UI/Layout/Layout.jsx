import React from 'react'
import Container from 'react-bootstrap/Container'

import Appbar from '../Appbar/Appbar'

const Layout = ({ children }) => {
  return (
    <>
      <Appbar />
      <Container as='main' className='py-5'>
        {children}
      </Container>
    </>
  )
}

export default Layout
