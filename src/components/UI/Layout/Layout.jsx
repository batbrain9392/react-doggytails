import React from 'react'
import Container from 'react-bootstrap/Container'

import Header from '../Header/Header'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Container>
        <main>{children}</main>
      </Container>
    </>
  )
}

export default Layout
