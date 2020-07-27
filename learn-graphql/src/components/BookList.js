import React from 'react'
import { gql } from 'apollo-boost'
import { graphql } from 'react-apollo'

const getBooks = gql`
  {
    books {
      id
      name
      genre
    }
  }
`

function BookList(props) {
  console.log(props.data.loading)
  return (
    <div>
      <h1>Book List:</h1>
    </div>
  )
}

export default graphql(getBooks)(BookList)