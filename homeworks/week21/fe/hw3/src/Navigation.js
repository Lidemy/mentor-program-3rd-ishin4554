import React, {Component} from 'react';
import styled from 'styled-components';

const Nav = styled.section`
  display: flex;
  height: 50px;
  &>span {
    font-weight: 800;
  }
  &>* {
    height: 20px;
    font-weight: 300;
    margin: 10px
    &:hover {
      border-bottom: solid 1px black;
    }
  }
  &:hover {
    cursor: pointer;
  }
`

class NavLink extends Component {

  clickNav = () => {
    const {tab, handleClickNav} = this.props
    handleClickNav(tab)
  }  

  render() {
    const {tab} = this.props
    return <div onClick={this.clickNav}>{tab}</div>
  }
}

class Navigation extends Component{
  constructor(props) {
    super(props)
    this.tabs = ['home', 'about']
  }

  handleClickNav = (tab) => {
    const {changePage} = this.props
    changePage(tab)
  }

  render() {
    return(
      <Nav>
        <span>minw</span>
        {this.tabs.map(tab => <NavLink handleClickNav={this.handleClickNav} tab={tab}/>)}
      </Nav>
    )
  }
}

export default Navigation;
