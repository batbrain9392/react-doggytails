import db from './db'

const addToken = token => `auth=${token}`

const add = async (pet, token) => {
  const queryParams = addToken(token)
  const { data } = await db.post(`/pets.json?${queryParams}`, pet)
  return data
}

export default {
  add,
}
