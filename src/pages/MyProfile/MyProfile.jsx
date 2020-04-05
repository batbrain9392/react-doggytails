import React, { useState, useEffect, useContext, useCallback } from 'react'
import { Link } from 'react-router-dom'

import AuthContext from '../../lib/auth-context'
import petService from '../../http/pet'

const MyProfile = () => {
  const [adoptions, setAdoptions] = useState([])
  const [loadingAdoption, setLoadingAdoption] = useState(true)
  const [donations, setDonations] = useState([])
  const [loadingDonation, setLoadingDonation] = useState(true)
  const { userId, token } = useContext(AuthContext)

  const fetchMyAdoptions = useCallback(async () => {
    const data = await petService.fetchAllOfAdopter(userId, token)
    setAdoptions(data)
    setLoadingAdoption(false)
  }, [userId, token])

  const fetchMyDonations = useCallback(async () => {
    const data = await petService.fetchAllOfDonor(userId)
    setDonations(data)
    setLoadingDonation(false)
  }, [userId])

  useEffect(() => {
    fetchMyDonations()
    fetchMyAdoptions()
  }, [fetchMyDonations, fetchMyAdoptions])

  const cancelAdoptionHandler = async petId => {
    const original = [...adoptions]
    const updated = adoptions.filter(pet => pet.id !== petId)
    setAdoptions(updated)
    try {
      await petService.removeAdoption(petId, token)
    } catch (error) {
      console.log(error)
      setAdoptions(original)
    }
  }

  const cancelDonationHandler = async petId => {
    const original = [...donations]
    const updated = donations.filter(pet => pet.id !== petId)
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
      <h3>My Profile</h3>
      <section>
        <h5>My Adoptions</h5>
        {loadingAdoption ? (
          'Loading...'
        ) : adoptions.length ? (
          adoptions.map(pet => (
            <div key={pet.id}>
              <pre>{JSON.stringify(pet, null, 2)}</pre>
              <button onClick={() => cancelAdoptionHandler(pet.id)}>
                cancel
              </button>
            </div>
          ))
        ) : (
          <p>
            You haven't adopted any yet. <br />
            <Link to='/adopt'>adopt now</Link>
          </p>
        )}
      </section>
      <hr />
      <section>
        <h5>My Donations</h5>
        {loadingDonation ? (
          'Loading...'
        ) : donations.length ? (
          donations.map(pet => (
            <div key={pet.id}>
              <pre>{JSON.stringify(pet, null, 2)}</pre>
              <button onClick={() => cancelDonationHandler(pet.id)}>
                cancel
              </button>
            </div>
          ))
        ) : (
          <p>
            You haven't donated any yet. <br />
            <Link to='/donate'>donate now</Link>
          </p>
        )}
      </section>
    </>
  )
}

export default MyProfile