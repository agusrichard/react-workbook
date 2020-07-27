import { gql } from '@apollo/client'

const getBooksQuery = gql`
  query getBooks {
    books {
      id
      name
      genre
    }
  }
`

const getAuthorsQuery = gql`
  query getAuthors {
    authors {
      id
      name    
    }
  }
`

const addBookMutation = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      id
      name
      genre
    }
  }
`

const getBookQuery = gql`
  query getBook($bookId: ID!) {
    book(id: $bookId) {
      id
      name
      genre
    }
  }
`

export { getBooksQuery, getAuthorsQuery, addBookMutation, getBookQuery }