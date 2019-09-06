import React, {Component} from 'react';
import styled from 'styled-components';
import Card from './Card'; 

const Content = styled.section`
  width:60%
`

class Menu extends Component{
  constructor(props) {
    super(props)
  }

  handleClick = (id) => {
    const {changePage} = this.props
    changePage(id);
  }

  render() {
    const {posts} = this.props
    return(
      <ul>
        {posts.map(post => (
          <Card id={post.id} post={post} handleClick={this.handleClick}/>
        ))}
      </ul>
    )
  }
}

export default Menu;
