import React, { useContext } from 'react';
import { Switch, Route } from 'react-router-dom'
import { Context } from './contexts/context'
import Home from './pages/Home'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import BookList from './pages/BookList'
import AddBook from './pages/AddBook'
import NotFound from './pages/NotFound'

function App() {
  const { state } = useContext(Context)

  if (!state.isLoggedIn) {
    return (
      <Switch>
        <Route exact path="/" component={ Home } />
          <Route exact path="/login" component={ Login } />
          <Route exact path="/signup" component={ SignUp } />
          <Route component={ NotFound } />
      </Switch>
    )
  } else {
    return (
      <Switch>
        <Route exact path="/booklist" component={ BookList } />
        <Route exact path="/addbook" component={ AddBook } />
        <Route component={ NotFound } />
      </Switch>
    )
  }
}

export default App;
