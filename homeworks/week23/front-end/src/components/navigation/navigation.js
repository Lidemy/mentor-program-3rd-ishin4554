import React, {Component} from 'react';
import Eye from '../../common/eye';
import './navigation.sass';
import { Link, Route } from 'react-router-dom';

class NavItem extends Component {

  render() {
    const {to, children} = this.props;
    return (
      <Route
        path={to}
        exact={false}
        children={({ match }) => (
          <li onMouseOver={Eye.openEye} onMouseOut={Eye.closeEye}
          className={match ? "active navigation__item" : "navigation__item"}>
            <Link to={to} text-value={children}>{children}</Link>
          </li>
        )}
      />
    );
  }
}

class Navigation extends Component{
  constructor(props) {
    super(props)
  }

  handleLogout = () => {
    const { logout } = this.props;
    logout();
  }

  render() {
    const {isLogin} = this.props
    return(
      <nav className='navigation'>
        <div className='navigation__visitor'>
          <div className='navigation__logo' text-value='維新'><strong>ISHIN</strong></div>
          <NavItem to="/about">ABOUT</NavItem>
          <NavItem to="/work">WORK</NavItem>
          <NavItem to="/fun">FUN</NavItem>
          <NavItem to="/log">LOG</NavItem>
        </div>
        { !isLogin &&
          <div className='navigation__member'>
            <NavItem to="/login">LOGIN</NavItem>
            <NavItem to="/register">REGISTER</NavItem>
          </div>
        }
        { isLogin &&
          <div className='navigation__member'>
            <NavItem to="/create/post">ADD</NavItem>
            <div onClick={this.handleLogout}>LOGOUT</div>
          </div>
        }
      </nav>
    )
  }
}



export default Navigation;
