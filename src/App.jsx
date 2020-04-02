import React, { useState } from 'react'
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
  const [isAuthenticated, setIsLoggedIn] = useState(false)
  const authContextValue = {
    isAuthenticated,
    login: () => setIsLoggedIn(true),
    logout: () => setIsLoggedIn(false),
  }

  return (
    <AuthContext.Provider value={authContextValue}>
      <Layout>
        <Switch>
          <Route path='/pets/:id' component={Details} />
          <Route path='/pets' component={Pets} />
          <ProtectedRoute path='/adopt' component={Adopt} />
          <ProtectedRoute path='/donate' component={Donate} />
          <Route path='/auth' component={Auth} />
          <Route path='/' exact component={Home} />
          <Redirect to='/' />
        </Switch>
      </Layout>
    </AuthContext.Provider>
  )
}

export default App
