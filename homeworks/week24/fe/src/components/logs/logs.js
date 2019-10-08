import React, {Component} from 'react';
import './logs.sass';
import sizeMe from 'react-sizeme';
import StackGrid from "react-stack-grid";
import LogsModal from './logsModal';

class Log extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      imgUrl: '',
      height: Math.random()*100+200+'px'
    }
  }

  render() {
    const {height} = this.state;
    const {log, handlePopUp} = this.props;
    return(
      <div className='log'
        onClick={() => {handlePopUp(log.id)}} 
        data-img={log.imgUrl}
        style={{backgroundImage: `url('${log.imgUrl}')`}}>
        <h2 style={{height}}>{log.title}</h2>
      </div>
    );
  }
}

class Logs extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
    }
  }

  getList = () => {
    const { getPostsList } = this.props;
    getPostsList('log');
  }

  handlePopUp = (id) => {
    const {isOpen} = this.state;
    if(!isOpen) {
      this.props.getPost(id);
    }
    this.setState({
      isOpen: !isOpen,
    })
  }

  componentDidMount() {
    this.getList();
  }
  render() {
    const { 
      postsList,
      post,
      isLoadingGetPost,
      size: { 
        width
      } 
    } = this.props;
    const {isOpen} = this.state;
    console.log(post)
    return (
      <div className='log__page'>
        <StackGrid
          columnWidth={width <= 768 ? '100%' : '20%'}
          gutterWidth={10}
          gutterHeight={10}
        >
          {postsList && 
            postsList.map(log => 
            <Log handlePopUp={this.handlePopUp}
              key={log.id} log={log}/>)}
        </StackGrid>
        {isOpen && !isLoadingGetPost &&
          <LogsModal post={post} handlePopUp={this.handlePopUp}/>
        }
      </div>

    );
  }
}

export default sizeMe()(Logs);
