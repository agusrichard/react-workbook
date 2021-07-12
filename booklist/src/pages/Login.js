import React, { useState, useContext, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { Link } from 'react-router-dom'
import Input from '../components/Input'
import Container from '../components/Container'
import Button from '../components/Button'
import { LOGIN } from '../graphql/query'
import { Context } from '../contexts/context'

export default function Login(props) {
  const { state, dispatchLogin } = useContext(Context)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { data, loading, error }] = useMutation(LOGIN, { 
    errorPolicy: 'all'
  })
  const handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const { errors, data } = await login({ variables: { email, password } })
      if (!errors) {
        dispatchLogin(data.login.token)
        props.history.push('/booklist')
      }
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <Container>
      <h1 className="title" style={{ marginTop: 70, marginBottom: 75 }}>Login</h1>
        { error && <p className="error-text">{ error.message }</p> }
      <form onSubmit={ handleSubmit }>
      <Input 
          placeholder="Email"
          type="email"
          onChange={(event) => setEmail(event.target.value)}
          value={ email }
        />
        <Input 
          placeholder="Password" 
          type="password" 
          onChange={(event) => setPassword(event.target.value)}
          value={ password }
        />
        <Button title="Login" style={{ marginTop: 30 }}/>
      </form>
      <Link to="/signup" className="bottom-link">Have no account?</Link>
    </Container>
  )
}