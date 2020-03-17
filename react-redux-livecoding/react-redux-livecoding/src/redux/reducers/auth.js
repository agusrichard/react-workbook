import { USER_LOGIN } from '../actions/types'

const initialState = {
  data: [],
  isLoading: false
}

export default function authReducer(state=initialState, action) {
  switch (action.type) {
    case USER_LOGIN: return {
      ...state,
      data: action.payload,
      isLoading: !state.isLoading
    }
    default: return state
  }
}