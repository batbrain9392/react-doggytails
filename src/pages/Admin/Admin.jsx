import React, { useState, useEffect, useCallback, useContext } from 'react'

import AuthContext from '../../lib/auth-context'
import petService from '../../http/pet'
import userService from '../../http/user'

const Admin = () => {
  const [pets, setPets] = useState([])
  const [loadingPets, setLoadingPets] = useState(true)
  const [users, setUsers] = useState([])
  const [loadingUsers, setLoadingUsers] = useState(true)
  const { token } = useContext(AuthContext)

  const fetchAllPets = useCallback(async () => {
    try {
      const data = await petService.fetchAll()
      console.log(data)
      setPets(data)
      setLoadingPets(false)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const fetchAllUsers = useCallback(async () => {
    try {
      const data = await userService.fetchAll(token)
      console.log(data)
      setUsers(data)
      setLoadingUsers(false)
    } catch (error) {
      console.log(error)
    }
  }, [token])

  useEffect(() => {
    fetchAllPets()
    fetchAllUsers()
  }, [fetchAllPets, fetchAllUsers])

  return <div></div>
}

export default Admin
