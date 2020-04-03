import db from './db'
import { toArray } from '../lib/util'

const addToken = token => `auth=${token}`

const add = async (pet, token) => {
  const queryParams = addToken(token)
  const { data } = await db.post(`/pets.json?${queryParams}`, pet)
  return data
}

const fetchAll = async () => {
  const { data } = await db.get(`/pets.json`)
  return toArray(data)
}

export default {
  add,
  fetchAll,
}
