import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { FaArrowCircleLeft } from 'react-icons/fa'
import { useMutation } from '@apollo/client'
import { ADD_BOOK } from '../graphql/query'
import { Context } from '../contexts/context'
import Container from '../components/Container'
import Input from '../components/Input'
import Button from '../components/Button'



export default function AddBook(props) {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const { state } = useContext(Context)
  const [addBook, { loading, data, error }] = useMutation(ADD_BOOK, {
    context: {
      headers: {
        authorization: `Bearer ${state.token}`
      }
    }
  })

  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { errors, data } = await addBook({ variables: { title, author } })
      if (!errors) {
        props.history.push('/booklist')
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <h1 className="title" style={{ marginTop: '25px' }}>Add Book</h1>
      <Link to="/booklist"><FaArrowCircleLeft className="add-button" /></Link>
      <form style={{ marginTop: 50 }} onSubmit={ handleSubmit }>
        <Input 
          placeholder="Title"
          onChange={(event) => setTitle(event.target.value)}
          value={title}
        />
        <Input 
          placeholder="Author"
          onChange={(event) => setAuthor(event.target.value)}
          value={author}
        />
        <Button title="Add" style={{ marginTop: 30 }} loading={ loading }/>
      </form>
    </Container>
  )
}