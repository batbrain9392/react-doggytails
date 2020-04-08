import React, { useState, useEffect, useCallback } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AuthContext from './lib/auth-context'
import auth from './http/auth'

import Layout from './components/UI/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Adopt from './pages/Adopt/Adopt'
import PetDetails from './pages/PetDetails/PetDetails'
import Auth from './pages/Auth/Auth'
import Donate from './pages/Donate/Donate'
import MyProfile from './pages/MyProfile/MyProfile'

function App() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)

  const postSignin = (authInfo) => {
    setToken(authInfo.token)
    setUserId(authInfo.userId)
    setUserDetails(authInfo.userDetails)
  }

  const postLogout = () => {
    setToken(null)
    setUserId(null)
    setUserDetails(null)
  }

  const authenticate = async (email, password, rest) => {
    setIsCheckingAuth(true)
    try {
      const authInfoData = await auth.authenticate(
        email,
        password,
        rest,
        postLogout
      )
      postSignin(authInfoData)
    } catch (error) {
      console.log(error)
    }
    setIsCheckingAuth(false)
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
    signin: (email, password) => authenticate(email, password),
    signup: (email, password, rest) => authenticate(email, password, rest),
    logout,
  }

  const checkAuth = useCallback(async () => {
    setIsCheckingAuth(true)
    try {
      const authInfoData = await auth.checkAuth(postLogout)
      if (authInfoData) {
        postSignin(authInfoData)
      }
    } catch (error) {
      console.log(error)
    }
    setIsCheckingAuth(false)
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider value={authContextValue}>
      <Layout>
        <Switch>
          <Route path='/adopt/:id' component={PetDetails} />
          <Route path='/adopt' component={Adopt} />
          <Route path='/donate' component={Donate} />
          <ProtectedRoute path='/my-profile' component={MyProfile} />
          <ProtectedRoute path='/auth' component={Auth} isAuthPath />
          {/* <Route path='/' exact component={Home} /> */}
          <Redirect to='/adopt' />
        </Switch>
      </Layout>
    </AuthContext.Provider>
  )
}

export default App
