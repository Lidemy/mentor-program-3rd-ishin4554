import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import Form from './form';

class CreatePost extends Component{

  handlePostForm = (evt, data) => {
    const {history} = this.props;
    console.log(data)
    fetch('/api/posts',{
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(data),
    }).then(() => history.push('/home/'))
    evt.preventDefault()
  }

  render() {
    return(
      <div className='page'>
        <Form handleForm={this.handlePostForm}/>
      </div>
    )
  }
}

export default withRouter(CreatePost);
