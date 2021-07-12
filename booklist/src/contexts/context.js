import React, { createContext, useContext } from 'react'
import reducer from './reducer'

export const Context = createContext()

export default function ContextProvider({ children }) {

  const [state, dispatch] = reducer()

  const dispatchLogin = (token) => {
    localStorage.setItem('token', token)
    dispatch({ type: 'LOGIN', payload: token })
  }

  const dispatchLogout = () => {
    // localStorage.removeItem('token')
    dispatch({ type: 'LOGOUT' })
  }

  return (
    <Context.Provider value={{ state, dispatchLogin, dispatchLogout }}>
      { children }
    </Context.Provider>
  )
}