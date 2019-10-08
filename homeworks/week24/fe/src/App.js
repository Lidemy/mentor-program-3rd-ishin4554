import React, {Component} from 'react';
import { HashRouter as Router } from 'react-router-dom';

import Navigation from './containers/navigation';
import Routes from './containers/routes';
import './common/main.sass';

class App extends Component{
  render() {
    return(
      <Router>     
        <Navigation />
        <div className='page'>
          <Routes />
        </div>
      </Router>
    )
  }
}

export default App;
