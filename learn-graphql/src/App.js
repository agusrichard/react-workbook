import React from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'

// Components
import BookList from './components/BookList'
import AddBook from './components/AddBook'
import BookDetails from './components/BookDetails'


// Apollo Setup
const client = new ApolloClient({
  uri: process.env.REACT_APP_BASEURL,
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={ client } >
      <div className="App">
        <h1>My Reading List</h1>
        <BookList />
        <AddBook />
      </div>
    </ApolloProvider>
  );
}

export default App;
