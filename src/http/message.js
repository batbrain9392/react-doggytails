import db from './db'

const url = 'messages'

const send = async (message) => {
  const { data } = await db.post(`/${url}.json`, message)
  return data
}

export default {
  send,
}
