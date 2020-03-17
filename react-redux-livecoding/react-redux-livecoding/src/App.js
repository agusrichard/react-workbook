import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import './App.css'
import Login from './components/Login'
import { store } from './redux/store'
import { persistor } from './redux/store'

class App extends Component {

  render() {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={ persistor }>
        <div className="App">
          <header>
            <h1 className="App-title" >Welcome to React</h1>
          </header>
          <Login />
        </div>
      </PersistGate>
    </Provider>
    )
  }
}


export default App