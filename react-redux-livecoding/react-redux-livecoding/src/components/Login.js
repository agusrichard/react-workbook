import React from 'react'
import { connect } from 'react-redux'
import { userLogin } from '../redux/actions/auth'

class Login extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const userData = {
      username: this.state.username,
      password: this.state.password
    }
    this.props.userLogin(userData)
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <div>
        <form method="POST" onSubmit={this.handleSubmit}>
          <div>
            <label>Username: </label>
            <input placeholder="Username" name="username" onChange={this.handleChange}/>
          </div>
          <div>
            <label>Password: </label>
            <input placeholder="Username" type="password" name="password" onChange={this.handleChange}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = { userLogin }

export default connect(null, mapDispatchToProps)(Login)