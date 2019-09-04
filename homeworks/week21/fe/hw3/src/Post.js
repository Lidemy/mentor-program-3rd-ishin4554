import React, {Component} from 'react';
import styled from 'styled-components';
const url = 'https://jsonplaceholder.typicode.com/posts/'

const Content = styled.section`
  margin: 0 auto; 
  width: 60%;
  &>h1 {
    font-size: 40px;
    padding-bottom: 10px;
    border-bottom: solid 1px black;
  }
`

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      body: '',
      user_id: '',
    }
  }

  componentDidMount() {
    const {page} = this.props
    if(page !== 'about') {
      fetch(`${url}${page}`)
      .then(res => res.json())
      .then((result) => {
        this.setState({
          title: result.title,
          body: result.body,
          user_id: result.user_id,
        })
      },
      (error) => {
        this.setState({
          error
        })
      })
    } else {
      this.setState({
        title: 'About',
        body: '這裡是 react blog 練習',
        user_id: 0,
      })
    }
  }

  render() {
    const {title, body, user_id} = this.state
    return(
      <Content>
        <h3>{user_id}</h3>
        <h1>{title}</h1>
        <p>{body}</p>
      </Content>
    )
  }
}

export default Post;
