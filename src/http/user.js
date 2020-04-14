import db from './db'

const url = 'users'
const addToken = (token) => `auth=${token}`

const addUser = async (userId, user, token) => {
  const queryParams = addToken(token)
  const { data } = await db.put(`/${url}/${userId}.json?${queryParams}`, user)
  return data
}

const fetchDetails = async (userId, token) => {
  const queryParams = addToken(token)
  const { data } = await db.get(`/${url}/${userId}.json?${queryParams}`)
  return data
}

export default {
  addUser,
  fetchDetails,
}
