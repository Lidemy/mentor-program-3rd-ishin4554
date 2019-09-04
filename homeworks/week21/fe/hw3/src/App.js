import React, {Component} from 'react';
import styled from 'styled-components';
import Navigation from './Navigation';
import Menu from './Menu';
import Post from './Post';

const Container = styled.section`
  margin: 0 auto;
  width: 70%;
`

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      page: 'home',
      isLoaded: false,
      posts: '',
    }
  }

  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then((result) => {
      this.setState({
        isLoaded: true,
        posts: result
      })
    },
    (error) => {
      this.setState({
        isLoaded: true,
        error
      })
    },)
  }

  changePage = (id) => {
    if(id) {
      this.setState({
        page: id
      })
    }
  }

  render() {
    const { error, isLoaded, posts, page } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else if (page === 'home') {
      return (
        <Container>
          <Navigation changePage={this.changePage}/>
          <Menu posts={posts} changePage={this.changePage}/>
        </Container>
      );
    } else {
      return (
        <Container>
          <Navigation changePage={this.changePage}/>
          <Post page={page}/>
        </Container>
      );
    }
  }
}

export default App;
