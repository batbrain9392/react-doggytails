import { createContext } from 'react'

const AuthContext = createContext({
  isCheckingAuth: false,
  isAuthenticated: false,
  token: null,
  userId: null,
  userDetails: null,
  authenticate: async (creds) => {},
  logout: () => {},
})

export default AuthContext
