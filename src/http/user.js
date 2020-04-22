import db from './db'
import { toArray } from '../lib/util'

const url = 'users'
const addToken = (token) => `auth=${token}`

const addUser = async (userId, user, token) => {
  user = { ...user, timestamp: new Date().getTime() }
  const queryParams = addToken(token)
  const { data } = await db.put(`/${url}/${userId}.json?${queryParams}`, user)
  return data
}

const fetchDetails = async (userId, token) => {
  const queryParams = addToken(token)
  const { data } = await db.get(`/${url}/${userId}.json?${queryParams}`)
  return data
}

const fetchAll = async (token) => {
  const queryParams = addToken(token)
  const { data } = await db.get(`/${url}.json?${queryParams}`)
  return toArray(data)
}

export default {
  addUser,
  fetchDetails,
  fetchAll,
}
