import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'

import Home from './pages/Home/Home'
import Pets from './pages/Pets/Pets'
import Adopt from './pages/Adopt/Adopt'
import Donate from './pages/Donate/Donate'
import Logout from './pages/Auth/Logout/Logout'
import Auth from './pages/Auth/Auth'

function App() {
  const isAuthenticated = true
  const routes = !isAuthenticated ? (
    <Switch>
      <Route path='/pets' component={Pets} />
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={Home} />
      <Redirect to='/' />
    </Switch>
  ) : (
    <Switch>
      <Route path='/pets' component={Pets} />
      <Route path='/adopt' component={Adopt} />
      <Route path='/donate' component={Donate} />
      <Route path='/logout' component={Logout} />
      <Route path='/auth' component={Auth} />
      <Route path='/' exact component={Home} />
      <Redirect to='/' />
    </Switch>
  )

  return routes
}

export default App
