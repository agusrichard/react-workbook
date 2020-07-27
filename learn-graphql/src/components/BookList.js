import React, { useState } from 'react'
import { useQuery } from '@apollo/client'
import { getBooksQuery } from '../queries/queries'
import BookDetails from '../components/BookDetails'

export default function BookList(props) {
  const { loading, data } = useQuery(getBooksQuery)
  const [selectedBook, setSelectedBook] = useState(null)

  return (
    <div>
      { loading ?
        <h5>loading...</h5>
        :
        <div>
          <ul>
            {
              data.books.map(book => (
                <li key={ book.id } onClick={() => setSelectedBook(book.id)}>{ book.name }</li>
              ))
            }
          </ul>
          { selectedBook ? <BookDetails bookId={ selectedBook }/> : <p>No Details</p>}
        </div>
      }
    </div>
  )
}