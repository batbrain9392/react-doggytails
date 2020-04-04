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

  return (
    <>
      <h3>My Profile</h3>
      <section>
        <h4>My Adoptions</h4>
        {loadingAdoption ? (
          'Loading...'
        ) : adoptions.length ? (
          adoptions.map(pet => (
            <div key={pet.id}>
              <pre>{JSON.stringify(pet, null, 2)}</pre>
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
        <h4>My Donations</h4>
        {loadingDonation ? (
          'Loading...'
        ) : donations.length ? (
          donations.map(pet => (
            <div key={pet.id}>
              <pre>{JSON.stringify(pet, null, 2)}</pre>
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
