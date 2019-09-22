import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import PostList from './postList.js';
import './home.sass';

class Fun extends Component{
  render() {
    const {auth} = this.props;
    return(
      <div className='page'>
        <PostList category={this.props.match.path.slice(1)}auth = {auth}/>
      </div>
    )
  }
}

export default withRouter(Fun);
