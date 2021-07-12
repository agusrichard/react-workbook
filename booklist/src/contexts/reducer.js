import { useReducer } from 'react'

const savedState = JSON.parse(localStorage.getItem('state'))
let state = {}
if (savedState) {
  state = savedState
} else {
  const initialState = {
    token: '',
    isLoggedIn: false
  }
  localStorage.setItem('state', JSON.stringify(initialState))
  state = initialState
}


function reducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      var value = {
        ...state,
        token: action.payload,
        isLoggedIn: true
      }
      localStorage.setItem('state', JSON.stringify(value))
      return value
    case 'LOGOUT':
      var value = {
        ...state,
        token: '',
        isLoggedIn: false
      }
      localStorage.setItem('state', JSON.stringify(value))
      return value
  }
}

export default () => useReducer(reducer, state)