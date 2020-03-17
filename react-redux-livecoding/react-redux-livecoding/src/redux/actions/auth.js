import axios from 'axios'

import { USER_LOGIN } from './types'

export const userLogin = userData => dispatch => {
  console.log(userData)
  axios.post('http://localhost:5000/auth/login', userData)
    .then(res => {
      dispatch({
        type: USER_LOGIN,
        payload: res.data.data
      })
    })
    .catch(err => console.log(err))
}