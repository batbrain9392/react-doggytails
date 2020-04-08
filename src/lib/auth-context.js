import { createContext } from 'react'

const AuthContext = createContext({
  isCheckingAuth: false,
  isAuthenticated: false,
  token: null,
  userId: null,
  userDetails: null,
  signin: async (email, password) => {},
  signup: async (email, password, rest) => {},
  logout: () => {},
})

export default AuthContext
