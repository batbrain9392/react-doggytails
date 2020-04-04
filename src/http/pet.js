import db from './db'
import { toArray } from '../lib/util'

const url = 'pets'
const addToken = token => `auth=${token}`
const addUserId = userId => `orderBy="donorUserId"&equalTo="${userId}"`

const add = async (pet, token) => {
  const queryParams = addToken(token)
  const { data } = await db.post(`/${url}.json?${queryParams}`, pet)
  return data.name
}

const fetchAll = async () => {
  const { data } = await db.get(`/${url}.json`)
  return toArray(data)
}

const fetchAllOfUser = async donorUserId => {
  const queryParams = addUserId(donorUserId)
  const { data } = await db.get(`/${url}.json?${queryParams}`)
  return toArray(data)
}

const fetch = async petId => {
  const { data } = await db.get(`/${url}/${petId}.json`)
  return data
}

export default {
  add,
  fetchAll,
  fetchAllOfUser,
  fetch,
}
