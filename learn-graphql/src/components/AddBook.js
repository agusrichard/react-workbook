import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { getAuthorsQuery, addBookMutation, getBooksQuery } from '../queries/queries'

export default function AddBook(props) {
  const { loading: getLoading, data: authors } = useQuery(getAuthorsQuery)
  const [addBook] = useMutation(addBookMutation)
  const [bookName, setBookName] = useState('')
  const [bookGenre, setBookGenre] = useState('')
  const [author, setAuthor] = useState('')


  const handleSubmit = (event) => {
    event.preventDefault()
    addBook({ 
      variables: {
        name: bookName,
        genre: bookGenre,
        authorId: author
      },
      refetchQueries: [{ query: getBooksQuery }]
    })
  }


  return (
    <div>
      <h3>Add Book:</h3>
      <form onSubmit={ handleSubmit }>
        <div>
          <label htmlFor="bookName">Book name: </label>
          <input type="text" id="bookName" onChange={(event) => setBookName(event.target.value)} />
        </div>
        <div>
          <label htmlFor="bookGenre">Book genre: </label>
          <input type="text" id="bookGenre" onChange={(event) => setBookGenre(event.target.value)} />
        </div>
        <div>
          <label htmlFor="selectAuthor">Author: </label>
          <select id="selectAuthor" onChange={(event) => setAuthor(event.target.value)} >
            <option>Select Author</option>
            { getLoading ?
              <option>loading...</option>
              :
              authors.authors.map(author => (
                <option value={ author.id } key={ author.id }>{ author.name }</option>
              ))
            }
          </select>
        </div>
        <button>Add</button>
      </form>
    </div>    
  )
}