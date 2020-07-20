import React, { useState, createContext } from 'react'

export const BookContext = createContext()

export default function BookContextProvider(props) {
  const [books, setBooks] = useState([
    {id: 1, title: 'The Silmarillion'},
    {id: 2, title: 'The Fourth Monkey'},
    {id: 3, title: 'Go set a watchmen'}
  ])

  return (
    <BookContext.Provider value={{ books }} >
      { props.children }
    </BookContext.Provider>
  )
}