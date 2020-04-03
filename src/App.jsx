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
  const [loggedInUser, setLoggedInUser] = useState(null)

  const postLogout = () => setLoggedInUser(null)

  const authenticate = async (email, password, isSignUp = false) => {
    const userId = await auth.authenticate(
      email,
      password,
      isSignUp,
      postLogout
    )
    setLoggedInUser(userId)
  }

  const logout = () => {
    auth.logout()
    postLogout()
  }

  const authContextValue = {
    isAuthenticated: !!loggedInUser,
    loggedInUser,
    signin: (email, password) => authenticate(email, password),
    signup: (email, password) => authenticate(email, password, true),
    logout,
  }

  useEffect(() => {
    const cachedIsAuthenticated = auth.checkAuth(postLogout)
    setLoggedInUser(cachedIsAuthenticated)
  }, [])

  return (
    <AuthContext.Provider value={authContextValue}>
      <Layout>
        <Switch>
          <Route path='/pets/:id' component={PetDetails} />
          <Route path='/pets' component={Pets} />
          <ProtectedRoute path='/adopt' component={Adopt} />
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
