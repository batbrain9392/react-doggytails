import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AuthContext from './lib/auth-context'
import auth from './http/auth'

import Layout from './components/UI/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './pages/Home/Home'
import Pets from './pages/Pets/Pets'
import PetDetails from './pages/PetDetails/PetDetails'
import Auth from './pages/Auth/Auth'
import Adopt from './pages/Adopt/Adopt'
import Donate from './pages/Donate/Donate'

function App() {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)

  const postSignin = authInfo => {
    setToken(authInfo.token)
    setUserId(authInfo.userId)
  }

  const postLogout = () => {
    setToken(null)
    setUserId(null)
  }

  const authenticate = async (email, password, isSignUp = false) => {
    const authInfo = await auth.authenticate(
      email,
      password,
      isSignUp,
      postLogout
    )
    postSignin(authInfo)
  }

  const logout = () => {
    auth.logout()
    postLogout()
  }

  const authContextValue = {
    isAuthenticated: !!userId,
    token,
    userId,
    signin: (email, password) => authenticate(email, password),
    signup: (email, password) => authenticate(email, password, true),
    logout,
  }

  useEffect(() => {
    const authInfo = auth.checkAuth(postLogout)
    if (authInfo) {
      postSignin(authInfo)
    }
  }, [])

  return (
    <AuthContext.Provider value={authContextValue}>
      <Layout>
        <Switch>
          <ProtectedRoute path='/pets/:id/adopt' component={Adopt} />
          <Route path='/pets/:id' component={PetDetails} />
          <Route path='/pets' component={Pets} />
          <ProtectedRoute path='/donate' component={Donate} />
          <ProtectedRoute path='/auth' component={Auth} isAuthPath />
          <Route path='/' exact component={Home} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </AuthContext.Provider>
  )
}

export default App
