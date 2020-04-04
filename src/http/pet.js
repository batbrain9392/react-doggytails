import db from './db'
import { toArray } from '../lib/util'

const url = 'pets'
const addToken = token => `auth=${token}`
const addUserId = (type, userId) => {
  const orderBy = `orderBy="${type}"`
  const equalTo = `&equalTo=${userId ? `"${userId}"` : null}`
  return `${orderBy}&${equalTo}`
}
const addDonorId = userId => addUserId('donorUserId', userId)
const addAdopterId = userId => addUserId('adopterUserId', userId)

const addForAdoption = async (pet, token) => {
  const queryParams = addToken(token)
  const { data } = await db.post(`/${url}.json?${queryParams}`, pet)
  return data.name
}

const fetchAllForAdoption = async () => {
  const queryParams = addAdopterId(null)
  const { data } = await db.get(`/${url}.json?${queryParams}`)
  return toArray(data)
}

const fetchAllOfUser = async queryParams => {
  const { data } = await db.get(`/${url}.json?${queryParams}`)
  return toArray(data)
}

const fetchAllOfDonor = userId => {
  return fetchAllOfUser(addDonorId(userId))
}

const fetchAllOfAdopter = userId => {
  return fetchAllOfUser(addAdopterId(userId))
}

const fetchDetails = async petId => {
  const { data } = await db.get(`/${url}/${petId}.json`)
  return data
}

const adopt = async (petId, adopterUserId, token) => {
  const queryParams = addToken(token)
  const { data } = await db.patch(`/${url}/${petId}.json?${queryParams}`, {
    adopterUserId,
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
}
