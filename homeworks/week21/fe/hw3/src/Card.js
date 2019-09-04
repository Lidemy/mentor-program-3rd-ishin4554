import React, {Component} from 'react';
import styled from 'styled-components';

const Title = styled.section`
  font-size: 40px;
  font-weight: 800;
  border-bottom: solid 1px #efefef;
  margin-bottom: 10px;

  &:hover {
    -webkit-text-stroke: 1px black;
    color: transparent;
    cursor: pointer;
  }
`

class Card extends Component{
  constructor(props) {
    super(props)
  }

  click = () => {
    const {handleClick, id} = this.props
    handleClick(id)
  }

  render() {
    const {post} = this.props
    return(
      <a className='card' onClick={this.click}>
        <span className='card__id'>{post.id}</span>
        <Title className='card__title'>{post.title}</Title>
      </a>
    )
  }
}

export default Card;
