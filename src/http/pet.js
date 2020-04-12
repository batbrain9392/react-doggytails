import db from './db'
import { toArray } from '../lib/util'

const url = 'pets'
const addToken = (token) => `auth=${token}`
const addUserId = (type, userId) => {
  const orderBy = `orderBy="${type}"`
  const equalTo = `&equalTo=${userId ? `"${userId}"` : null}`
  return `${orderBy}&${equalTo}`
}
const addDonorId = (userId) => addUserId('donorUserId', userId)
const addAdopterId = (userId) => addUserId('adopterUserId', userId)

const addForAdoption = async (pet, token) => {
  const queryParams = addToken(token)
  const { data } = await db.post(`/${url}.json?${queryParams}`, pet)
  return data.name
}

const fetchAllForAdoption = async (limit) => {
  let queryParams = addAdopterId(null)
  if (limit) {
    queryParams += `&limitToFirst=${limit}`
  }
  const { data } = await db.get(`/${url}.json?${queryParams}`)
  return toArray(data)
}

const fetchAllOfUser = async (queryParams) => {
  const { data } = await db.get(`/${url}.json?${queryParams}`)
  return toArray(data)
}

const fetchAllOfDonor = (userId) => {
  return fetchAllOfUser(addDonorId(userId))
}

const fetchAllOfAdopter = (userId) => {
  return fetchAllOfUser(addAdopterId(userId))
}

const fetchDetails = async (petId) => {
  const { data } = await db.get(`/${url}/${petId}.json`)
  return data
}

const adopt = async (petId, adopter, token) => {
  const queryParams = addToken(token)
  const { data } = await db.patch(`/${url}/${petId}.json?${queryParams}`, {
    ...adopter,
  })
  return data
}

const removeAdoption = (petId, token) => {
  const queryParams = addToken(token)
  return db.patch(`/${url}/${petId}.json?${queryParams}`, {
    adopterUserId: null,
    adopterName: null,
    adopterPhone: null,
  })
}

const removeDonation = (petId, token) => {
  const queryParams = addToken(token)
  return db.delete(`/${url}/${petId}.json?${queryParams}`)
}

const updateDonation = async (petId, editedValues, token) => {
  const queryParams = addToken(token)
  const { data } = await db.patch(`/${url}/${petId}.json?${queryParams}`, {
    ...editedValues,
  })
  return data
}

export default {
  addForAdoption,
  fetchAllForAdoption,
  fetchAllOfDonor,
  fetchAllOfAdopter,
  fetchDetails,
  adopt,
  removeAdoption,
  removeDonation,
  updateDonation,
}
