import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 

class Register extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      nickname: '',
    }
  }

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleRegisterForm = (evt) => {
    const {history} = this.props
    fetch('/api/register',{
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state),
    })
    .then(res => res.json())
    .then(data => data.state === 'success' && history.push('/home/'))
    evt.preventDefault()
  }

  render() {
    const {nickname, username, password} = this.state;
    return(
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleRegisterForm}>
          <div>
          Nickname: <input type='text' name='nickname' value={nickname} 
            onChange={this.handleInputChange} />
          </div>
          <div>
            Username: <input type='text' name='username' value={username} 
              onChange={this.handleInputChange} />
          </div>
          <div>
            Password: <input type='password' name='password' value={password} 
              onChange={this.handleInputChange} />  
          </div>
          <input type='submit' />
        </form>

      </div>
    )
  }
}

export default withRouter(Register);
