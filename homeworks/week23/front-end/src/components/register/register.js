import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import './register.sass';

class Register extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
      nickname: ''    
    }
  }

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleRegisterForm = (evt) => {
    evt.preventDefault()
    const { register, history } = this.props;
    const { username, password, nickname } = this.state;
    register(username, password, nickname);
    history.push('/login')
  }

  render() {
    const {username, password, nickname} = this.state;
    return(
      <div className='login'>
        <h1 className='login__title'>Register</h1>
        <form onSubmit={this.handleRegisterForm}>
          <div className='login__username'>
            Username: <br /> <input type='text' name='username' value={username} 
              onChange={this.handleInputChange} />
          </div>
          <div className='login__password'>
            Nickname: <br /> <input type='text' name='nickname' value={nickname} 
              onChange={this.handleInputChange} />  
          </div>
          <div className='login__password'>
            Password: <br /> <input type='password' name='password' value={password} 
              onChange={this.handleInputChange} />  
          </div>
          <input className='login__btn' type='submit' />
        </form>

      </div>
    )
  }
}

export default withRouter(Register);
