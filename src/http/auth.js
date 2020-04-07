import axios from 'axios'
import userService from './user'

let timeout = null

const clearAuthTimeout = () => {
  if (timeout) clearTimeout(timeout)
}

const logout = () => {
  if (timeout) clearTimeout(timeout)
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  localStorage.removeItem('expirationDate')
}

const setAuthTimeout = (expiresIn, postLogout) => {
  clearAuthTimeout()
  timeout = setTimeout(() => {
    console.log('Timeout')
    logout()
    postLogout()
  }, expiresIn)
}

const authenticate = async (email, password, rest, postLogout) => {
  const authData = {
    email: email,
    password: password,
    returnSecureToken: true,
  }
  const API_KEY = 'AIzaSyDSJIZsMHUxKonvnsXXXY0-SyLiKq6MQY4'
  const method = rest ? 'signUp' : 'signInWithPassword'
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${method}?key=${API_KEY}`
  try {
    const {
      data: { idToken: token, localId: userId, expiresIn },
    } = await axios.post(url, authData)
    setAuthTimeout(expiresIn * 1000, postLogout)
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
    const userDetails = rest
      ? await userService.addUser(userId, rest)
      : await userService.fetchDetails(userId)
    localStorage.setItem('expirationDate', expirationDate)
    localStorage.setItem('token', token)
    localStorage.setItem('userId', userId)
    return { token, userId, userDetails }
  } catch (error) {
    logout()
    throw error.response.data.error.message
  }
}

const checkAuth = async (postLogout) => {
  const token = localStorage.getItem('token')
  const expiration = localStorage.getItem('expirationDate')
  const userId = localStorage.getItem('userId')
  if (!token || !expiration || !userId) {
    logout()
    return null
  } else {
    const expirationDate = new Date(expiration)
    if (expirationDate <= new Date()) {
      logout()
      return null
    } else {
      try {
        const userDetails = await userService.fetchDetails(userId)
        let expiresIn = expirationDate.getTime() - new Date().getTime()
        setAuthTimeout(expiresIn, postLogout)
        return { token, userId, userDetails }
      } catch (error) {
        logout()
        throw error.response.data.error.message
      }
    }
  }
}

export default {
  authenticate,
  checkAuth,
  logout,
}
