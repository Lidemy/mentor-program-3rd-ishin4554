import {Component} from 'react';
import { withRouter } from 'react-router-dom'; 

class Logout extends Component{

  deleteCookie = () => {
    const {handleAuthState} = this.props;
    document.cookie = 'sessionID=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';    handleAuthState();
    handleAuthState();
  }

  componentDidMount() {
    const {history} = this.props
    this.deleteCookie();
    history.push('/home/');
  }

  render() {
    return null;
  }
}

export default withRouter(Logout);
