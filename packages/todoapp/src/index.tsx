import React from 'react'
import ReactDOM from 'react-dom/client'
import { TodoContainer } from './container'
import './index.css'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <TodoContainer />
  </React.StrictMode>
)
