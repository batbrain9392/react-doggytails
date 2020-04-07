import db from './db'

const url = 'users'

const addUser = async (userId, user) => {
  const { data } = await db.put(`/${url}/${userId}.json?`, user)
  return data
}

const fetchDetails = async (userId) => {
  const { data } = await db.get(`/${url}/${userId}.json`)
  return data
}

export default {
  addUser,
  fetchDetails,
}
