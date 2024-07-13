import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//Redux Toolkit
import { store } from './store/index.js'
import { Provider } from 'react-redux'
//Router-Dom
import { BrowserRouter } from 'react-router-dom'
//Main Style
import "./shared/styles/main.scss"

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>
)
