import { createContext } from 'react'

const AuthContext = createContext({
  isAuthenticated: false,
  loggedInUser: null,
  signin: async (email, password) => {},
  signup: async (email, password) => {},
  logout: () => {},
})

export default AuthContext
