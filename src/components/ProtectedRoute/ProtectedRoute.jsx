import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from '../../lib/auth-context'

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated)
          return (
            <Redirect
              to={{ pathname: '/auth', state: { from: props.location } }}
            />
          )
        return Component ? <Component {...props} /> : render(props)
      }}
    />
  )
}

export default ProtectedRoute
