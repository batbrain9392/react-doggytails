import axios from 'axios'

const authenticate = async (email, password, isSignUp) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  }
  const API_KEY = 'AIzaSyDSJIZsMHUxKonvnsXXXY0-SyLiKq6MQY4'
  const method = isSignUp ? 'signUp' : 'signInWithPassword'
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${API_KEY}`
  try {
    const {
      data: { idToken: token, localId: userId, expiresIn },
    } = await axios.post(url, authData)
    authCheckTimeout(expiresIn * 1000)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    localStorage.setItem('expirationDate', expirationDate)
    return userId
  } catch (error) {
    throw error.response.data.error.message
  }
}

const authCheckTimeout = expiresIn => {
  setTimeout(() => {
    logout()
  }, expiresIn)
}

const checkAuth = () => {
  const token = localStorage.getItem('token')
  if (!token) {
    logout()
    return null
  } else {
    const expirationDate = new Date(localStorage.getItem('expirationDate'))
    if (expirationDate <= new Date()) {
      logout()
      return null
    } else {
      const userId = localStorage.getItem('userId')
      let expiresIn = expirationDate.getTime() - new Date().getTime()
      authCheckTimeout(expiresIn)
      return userId
    }
  }
}

const logout = () => {
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
}

export default {
  authenticate,
  checkAuth,
  logout,
}
