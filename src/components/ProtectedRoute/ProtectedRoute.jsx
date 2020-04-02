import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom'

import AuthContext from '../../lib/auth-context'

const ProtectedRoute = ({ component: Component, render, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext)

  return (
    <Route
      {...rest}
      render={props => {
        const redirectTo = {
          pathname: '/auth',
          state: { from: props.location },
        }
        if (!isAuthenticated) return <Redirect to={redirectTo} />
        return Component ? <Component {...props} /> : render(props)
      }}
    />
  )
}

export default ProtectedRoute
