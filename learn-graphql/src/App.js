import React from 'react';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

// Components
import BookList from './components/BookList'


// Apollo Setup
const client = new ApolloClient({
  uri: process.env.REACT_APP_BASEURL
})

function App() {
  return (
    <ApolloProvider client={ client } >
      <div className="App">
        <h1>Hello World!</h1>
        <BookList />
      </div>
    </ApolloProvider>
  );
}

export default App;
