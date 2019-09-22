import React, {Component} from 'react';
import { withRouter } from 'react-router-dom'; 
import Form from './form';
import { postAPI } from '../common/APIUtlis';

class EditPost extends Component{
  constructor(props) {
    super(props)
    this.state = {
      article: null
    }
  }
  
  handleFormData = async () => {
    const {match} = this.props
    const id = Number(match.params.id);
    this.setState({
      article: await postAPI.getPost(id)
    })
  }

  handleEditForm = (evt, data) => {
    const {match, history} = this.props
    const id = Number(match.params.id);
    postAPI.updatePost(id, data)
    .then(data => data.json())
    .then(result => {
      if(result.state === 'success') {
        history.push('/work/')
      }
    })
    evt.preventDefault()
  }

  componentDidMount() {
    this.handleFormData();
  }

  render() {
    return(
      <div className='page'>
        <Form handleForm={this.handleEditForm} formData={this.state.article}/>
      </div>
    )
  }
}

export default withRouter(EditPost);
