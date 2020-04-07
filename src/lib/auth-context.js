import { createContext } from 'react'

const AuthContext = createContext({
  isAuthenticated: false,
  token: null,
  userId: null,
  signin: async (email, password) => {},
  signup: async (email, password, rest) => {},
  logout: () => {},
})

export default AuthContext
