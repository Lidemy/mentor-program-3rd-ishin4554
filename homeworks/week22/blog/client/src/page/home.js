import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import './home.sass';
import '../common/eye.sass';

class Home extends Component{
  render() {
    return(
      <div className='page'>
        <canvas></canvas>
      </div>
    )
  }
}

export default withRouter(Home);
