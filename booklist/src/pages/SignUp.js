import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import Input from '../components/Input'
import Container from '../components/Container'
import Button from '../components/Button'
import { SIGNUP } from '../graphql/query'


export default function SignUp(props) {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signup, { data, loading }] = useMutation(SIGNUP)
  const handleSubmit = (event) => {
    event.preventDefault()
    signup({ variables: { username, email, password } })
    props.history.push('/login')
  }

  return (
    <Container>
      <h1 className="title" style={{ marginTop: 60, marginBottom: 50 }}>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <Input 
          placeholder="Username" 
          type="text"
          onChange={(event) => setUsername(event.target.value)} 
          value={ username }
        />
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
        <Button title="Sign Up" style={{ marginTop: 20 }}/>
      </form>
      <Link to="/login" className="bottom-link">Already have an account?</Link>
    </Container>
  )
}