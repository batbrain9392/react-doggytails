import React, { useState, useEffect, useCallback } from 'react'
import { Route, Switch, Redirect, useHistory } from 'react-router-dom'

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

function App() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [userDetails, setUserDetails] = useState(null)
  const [isCheckingAuth, setIsCheckingAuth] = useState(false)
  const history = useHistory()

  const postSignin = useCallback(
    (authInfo, from) => {
      if (authInfo) {
        setToken(authInfo.token)
        setUserId(authInfo.userId)
        setUserDetails(authInfo.userDetails)
        if (from) {
          history.replace(from)
        }
      }
    },
    [history]
  )

  const postLogout = () => {
    setToken(null)
    setUserId(null)
    setUserDetails(null)
  }

  const authenticate = async ({ from, ...creds }) => {
    try {
      setIsCheckingAuth(true)
      const authInfo = await auth.authenticate(creds, postLogout)
      postSignin(authInfo, from)
      setIsCheckingAuth(false)
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
          <ProtectedRoute path='/auth' component={Auth} isAuthPath />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </AuthContext.Provider>
  )
}

export default App
