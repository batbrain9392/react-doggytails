import React, { useState, useEffect } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import AuthContext from './lib/auth-context'

import Layout from './components/UI/Layout/Layout'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Home from './pages/Home/Home'
import Pets from './pages/Pets/Pets'
import Details from './pages/Pets/Details/Details'
import Adopt from './pages/Adopt/Adopt'
import Donate from './pages/Donate/Donate'
import Auth from './pages/Auth/Auth'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const login = () => {
    setIsAuthenticated(true)
    localStorage.setItem('isAuthenticated', true)
  }
  const logout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('isAuthenticated')
  }
  const authContextValue = {
    isAuthenticated,
    login,
    logout,
  }

  useEffect(() => {
    const cachedIsAuthenticated = localStorage.getItem('isAuthenticated')
    setIsAuthenticated(cachedIsAuthenticated === 'true')
  }, [])

  return (
    <AuthContext.Provider value={authContextValue}>
      <Layout>
        <Switch>
          <Route path='/pets/:id' component={Details} />
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
