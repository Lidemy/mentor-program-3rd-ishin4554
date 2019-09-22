import React, {Component} from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import 'normalize.css';

import Register from './user/register';
import Login from './user/login';
import Logout from './user/logout';
import Navigation from './navigation/navigation';

import CreatePost from './post/createPost';
import EditPost from './post/editPost';

import Home from './page/home';
import Fun from './page/fun';
import Work from './page/work';
import Log from './page/log';

import About from './about/about';
import Article from './article/article';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      auth: document.cookie
    }
  }

  handleAuthState = () => {
    this.setState({
      auth: document.cookie
    })
  }

  render() {
    const {auth} = this.state;
    return(
      <div>
        <Router>
          <Navigation auth={auth} />
          <Route path='/login' render={(props) => (
            <Login {...props} handleAuthState={this.handleAuthState} />
          )} />
          <Route path='/register' component={Register}></Route>
          <Route path='/home' render={(props) => (
            <Home {...props} auth={auth} />
          )} />        
          <Route path='/fun' component={Fun}></Route>
          <Route path='/work' component={Work}></Route>
          <Route path='/log' component={Log}></Route>
          <Route path='/about' component={About}></Route>
          <Route path='/createPost' component={CreatePost}></Route>
          <Route path='/editPost/:id' component={EditPost}></Route>
          <Route path='/logout' render={(props) => (
            <Logout {...props} handleAuthState={this.handleAuthState} />
          )} />
          <Route path='/post/:id' render={(props) => (
            <Article {...props} auth={auth} />
          )} />
        </Router>
      </div>
    )
  }
}

export default App;
