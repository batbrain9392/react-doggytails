import React, { useState, useEffect, useContext, useCallback } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AuthContext from '../../lib/auth-context'
import petService from '../../http/pet'

import Heading from '../../components/UI/Heading/Heading'
import MyPets from '../../components/UI/MyPets/MyPets'

const MyProfile = () => {
  const [adoptions, setAdoptions] = useState([])
  const [loadingAdoption, setLoadingAdoption] = useState(true)
  const [donations, setDonations] = useState([])
  const [loadingDonation, setLoadingDonation] = useState(true)
  const { userId, token } = useContext(AuthContext)

  const fetchMyAdoptions = useCallback(async () => {
    try {
      const data = await petService.fetchAllOfAdopter(userId, token)
      setAdoptions(data)
      setLoadingAdoption(false)
    } catch (error) {
      console.log(error)
    }
  }, [userId, token])

  const fetchMyDonations = useCallback(async () => {
    try {
      const data = await petService.fetchAllOfDonor(userId)
      setDonations(data)
      setLoadingDonation(false)
    } catch (error) {
      console.log(error)
    }
  }, [userId])

  useEffect(() => {
    fetchMyDonations()
    fetchMyAdoptions()
  }, [fetchMyDonations, fetchMyAdoptions])

  const cancelAdoptionHandler = async (petId) => {
    const original = [...adoptions]
    const updated = adoptions.filter((pet) => pet.id !== petId)
    setAdoptions(updated)
    try {
      await petService.removeAdoption(petId, token)
    } catch (error) {
      console.log(error)
      setAdoptions(original)
    }
  }

  const editDonationHandler = async (petId) => {
    console.log(petId)
  }

  const cancelDonationHandler = async (petId) => {
    const original = [...donations]
    const updated = donations.filter((pet) => pet.id !== petId)
    setDonations(updated)
    try {
      await petService.removeDonation(petId, token)
    } catch (error) {
      console.log(error)
      setDonations(original)
    }
  }

  return (
    <>
      <Heading loading={loadingAdoption || loadingDonation}>My Profile</Heading>
      <Row>
        <Col md className='mb-5 mb-md-0'>
          <MyPets
            type='adopted'
            loading={loadingAdoption}
            pets={adoptions}
            onDelete={cancelAdoptionHandler}
          />
        </Col>
        <Col>
          <MyPets
            type='donated'
            loading={loadingDonation}
            pets={donations}
            onEdit={editDonationHandler}
            onDelete={cancelDonationHandler}
          />
        </Col>
      </Row>
    </>
  )
}

export default MyProfile
