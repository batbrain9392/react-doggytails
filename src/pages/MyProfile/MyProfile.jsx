import React, { useState, useEffect, useContext, useCallback } from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import AuthContext from '../../lib/auth-context'
import petService from '../../http/pet'

import Heading from '../../components/UI/Heading/Heading'
import MyDetails from '../../components/UI/MyDetails/MyDetails'
import Hr from '../../components/UI/Hr/Hr'
import MyPets from '../../components/UI/MyPets/MyPets'

const MyProfile = () => {
  const [adoptions, setAdoptions] = useState([])
  const [loadingAdoption, setLoadingAdoption] = useState(true)
  const [donations, setDonations] = useState([])
  const [loadingDonation, setLoadingDonation] = useState(true)
  const { userId, token, userDetails } = useContext(AuthContext)

  const fetchMyAdoptions = useCallback(async () => {
    try {
      const data = await petService.fetchAllOfAdopter(userId)
      setAdoptions(data)
      setLoadingAdoption(false)
    } catch (error) {
      console.log(error)
    }
  }, [userId])

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

  const deleteAdoptionHandler = async (petId) => {
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

  const editDonationHandler = async (petId, editedValues) => {
    const original = [...donations]
    const updated = donations.map((pet) =>
      pet.id === petId ? { ...pet, ...editedValues } : pet
    )
    setDonations(updated)
    try {
      await petService.updateDonation(petId, editedValues, token)
    } catch (error) {
      console.log(error)
      setDonations(original)
    }
  }

  const deleteDonationHandler = async (petId) => {
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
      <Heading>My Profile</Heading>
      <MyDetails userDetails={userDetails} />
      <Hr width='189px' loading={loadingAdoption || loadingDonation} />
      <Row>
        <Col md className='mb-5 mb-md-0'>
          {!loadingAdoption && (
            <MyPets
              type='adopted'
              pets={adoptions}
              onDelete={deleteAdoptionHandler}
            />
          )}
        </Col>
        <Col>
          {!loadingDonation && (
            <MyPets
              type='donated'
              pets={donations}
              onEdit={editDonationHandler}
              onDelete={deleteDonationHandler}
            />
          )}
        </Col>
      </Row>
    </>
  )
}

export default MyProfile
