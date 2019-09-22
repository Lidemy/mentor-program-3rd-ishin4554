import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import './login.sass';
class Login extends Component{
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: '',
    }
  }

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  setCookie = (id) => {
    const {handleAuthState} = this.props;
    const time = new Date();
    time.setTime(time.getTime() + 60 * 1000);
    document.cookie = `sessionID=${id};expires=${time};`;
    handleAuthState();
  }

  handleLoginForm = (evt) => {
    const {history} = this.props

    fetch('/api/login',{
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(this.state),
    })
    .then(res => res.json())
    .then(data => {
      if(data.state === 'success'){
        this.setCookie(data.session);
        history.push('/home/');
      } else {
        alert('fail')
      }
    })
    .catch(err => console.log(err))
    evt.preventDefault()
  }

  render() {
    const {username, password} = this.state;
    return(
      <div className='login'>
        <h1 className='login__title'>Login</h1>
        <form onSubmit={this.handleLoginForm}>
          <div className='login__username'>
            Username: <br /> <input type='text' name='username' value={username} 
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

export default withRouter(Login);
