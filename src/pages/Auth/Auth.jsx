import React, { useContext } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import AuthContext from '../../lib/auth-context'

const Auth = () => {
  const { login } = useContext(AuthContext)
  const history = useHistory()
  const location = useLocation()
  const { from } = location.state || { from: { pathname: '/' } }

  const handleClick = () => {
    login()
    history.replace(from)
  }

  return <button onClick={handleClick}>login</button>
}

export default Auth
