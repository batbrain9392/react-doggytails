import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import './assets/icons/fontawesome'
import './index.scss'
import App from './App'

const root = (
  // <React.StrictMode>
  <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
)

ReactDOM.render(root, document.getElementById('root'))
