import React from 'react'

import Banner from '../../components/UI/Banner/Banner'
import Testimonials from '../../components/UI/Testimonials/Testimonials'
import TopPets from '../../components/TopPets/TopPets'
import Events from '../../components/UI/Events/Events'

const Home = () => {
  console.log('Home')
  return (
    <>
      <Banner />
      <Testimonials />
      <TopPets />
      <Events />
    </>
  )
}

export default Home
