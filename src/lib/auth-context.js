import { createContext } from 'react'

const AuthContext = createContext({
  isCheckingAuth: false,
  isAuthenticated: false,
  token: null,
  userId: null,
  userDetails: null,
  isAdmin: false,
  authenticate: async (creds) => {},
  logout: () => {},
})

export default AuthContext
