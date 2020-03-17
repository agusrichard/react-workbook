import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootReducer from '../redux/reducers'

const persistConfig = {
  key: 'root',
  storage
}

const persistReducers = persistReducer(persistConfig, rootReducer)

const middleware = [logger, thunk]
export const store = createStore(
  persistReducers,
  compose(applyMiddleware(...middleware), 
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()))

export const persistor = persistStore(store)

// import rootReducer from './reducers'

// const initialState = {}
// const middleware = [thunk]

// const store = createStore(
//   rootReducer,
//   initialState,
//   compose(applyMiddleware(...middleware),
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
// )