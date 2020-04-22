import db from './db'
import { toArray } from '../lib/util'

const url = 'messages'
const addToken = (token) => `auth=${token}`

const fetchAll = async (token) => {
  const queryParams = addToken(token)
  const { data } = await db.get(`/${url}.json?${queryParams}`)
  return toArray(data)
}

const send = async (message) => {
  const { data } = await db.post(`/${url}.json`, message)
  return data
}

export default {
  fetchAll,
  send,
}
