import React from 'react'
import { useQuery } from '@apollo/client'
import { getBookQuery } from '../queries/queries'

export default function BookDetails(props) {
  const { loading, data } = useQuery(getBookQuery, { variables: { bookId: props.bookId } })

  return (
    <div>
      <h3>Book Details:</h3>
      { 
        loading ?
        <p>loading...</p>
        :
        <>
          <p>Name: {data.book.name}</p>
          <p>Genre: {data.book.genre}</p>
        </>
      }
    </div>
  )
}