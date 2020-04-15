import React, { useState, useEffect, useCallback } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AuthContext from './lib/auth-context'
import auth from './http/auth'

import Layout from './components/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Adopt from './pages/Adopt/Adopt'
import PetDetails from './pages/PetDetails/PetDetails'
import Auth from './pages/Auth/Auth'
import Donate from './pages/Donate/Donate'
import MyProfile from './pages/MyProfile/MyProfile'
import Home from './pages/Home/Home'
import Admin from './pages/Admin/Admin'

function App() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  const postSignin = useCallback((authInfo) => {
    if (authInfo) {
      setToken(authInfo.token)
      setUserId(authInfo.userId)
      const {
        userDetails: { isAdmin: isAdminVal, ...userDetailsVal },
      } = authInfo
      setUserDetails(userDetailsVal)
      setIsAdmin(isAdminVal || false)
    }
  }, [])

  const postLogout = () => {
    setToken(null)
    setUserId(null)
    setUserDetails(null)
    setIsAdmin(false)
  }

  const authenticate = async (creds) => {
    try {
      setIsCheckingAuth(true)
      const authInfo = await auth.authenticate(creds, postLogout)
      postSignin(authInfo)
      setIsCheckingAuth(false)
      return authInfo.userDetails.isAdmin
    } catch (error) {
      setIsCheckingAuth(false)
      throw error
    }
  }

  const logout = () => {
    auth.logout()
    postLogout()
  }

  const authContextValue = {
    isCheckingAuth,
    isAuthenticated: !!userDetails,
    token,
    userId,
    userDetails,
    isAdmin,
    authenticate,
    logout,
  }

  const checkAuth = useCallback(async () => {
    setIsCheckingAuth(true)
    try {
      const authInfo = await auth.checkAuth(postLogout)
      postSignin(authInfo)
    } catch (error) {
      console.log(error)
    }
    setIsCheckingAuth(false)
  }, [postSignin])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider value={authContextValue}>
      <Layout>
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/adopt/:id' component={PetDetails} />
          <Route path='/adopt' component={Adopt} />
          <Route path='/donate' component={Donate} />
          <ProtectedRoute path='/my-profile' component={MyProfile} />
          <ProtectedRoute path='/admin' component={Admin} />
          <Route path='/auth' component={Auth} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </AuthContext.Provider>
  )
}

export default App
