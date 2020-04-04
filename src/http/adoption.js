import db from './db'
import { toArray } from '../lib/util'

const url = 'adoptions'
const addToken = token => `auth=${token}`
const addUserId = userId => `orderBy="adopterUserId"&equalTo="${userId}"`
const addParams = (token, userId) => `${addToken(token)}&${addUserId(userId)}`

const add = async (adoption, token) => {
  const queryParams = addToken(token)
  const { data } = await db.post(`/${url}.json?${queryParams}`, adoption)
  return data
}

// const fetchAll = async (userId, token) => {
//   const queryParams = addParams(token, userId)
//   const { data } = await db.get(`/${url}.json?${queryParams}`)
//   return toArray(data)
// }

const fetchAllOfUser = async (adopterUserId, token) => {
  const queryParams = addParams(token, adopterUserId)
  const { data } = await db.get(`/${url}.json?${queryParams}`)
  return toArray(data)
}

// const fetch = async (petId, userId, token) => {
//   const queryParams = addParams(token, userId)
//   const { data } = await db.get(`/${url}/${petId}.json?${queryParams}`)
//   return data
// }

export default {
  add,
  // fetchAll,
  fetchAllOfUser,
  // fetch,
}
