import { useState } from 'react'

import { FormComponent, TextFieldComponent, FormItemWrapper, Button } from './form.styled'

const Form = () => {
  const [age, setAge] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleClick = (event) => {
    setIsSubmitted(true)
    event.preventDefault()
  }

  return (
    <FormComponent>
      <FormItemWrapper>
        <TextFieldComponent
          type="text"
          value={username}
          id="form-username"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </FormItemWrapper>
      <FormItemWrapper>
        <TextFieldComponent
          type="password"
          value={password}
          id="form-password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </FormItemWrapper>
      <FormItemWrapper>
        <TextFieldComponent
          value={age}
          type="number"
          id="form-age"
          placeholder="Age"
          onChange={(event) => setAge(event.target.value)}
        />
      </FormItemWrapper>
      <div>
        <Button id="form-submit" onClick={handleClick}>Submit</Button>
      </div>
      {isSubmitted && (
        <div>
          <p>{username}</p>
          <p>{password}</p>
          <p>{age}</p>
        </div>
      )}
    </FormComponent>
  )
}

export default Form