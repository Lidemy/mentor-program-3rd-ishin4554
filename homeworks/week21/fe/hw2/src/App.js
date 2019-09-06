import React, {Component} from 'react';
import './app.sass'

const boardWidth = 19;

class Square extends Component {
  constructor(props) {
    super(props)
  }

  click = () => {
    const {id, handleClick} = this.props
    handleClick(id)
  }

  render() {
    const {id, chess} = this.props;
    return (
      <div id={id} className="chess" onClick={this.click}>
        <svg>
          <circle cx="15" cy="15" r="10"
            stroke={chess === 'white' ? 'black' : ''}
            fill={chess === 'black' ? 'black' : 'white'}>
          </circle>
        </svg>
      </div>
    );
  }
}

class Board extends Component{
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(boardWidth).fill(Array(boardWidth).fill(null)),
    }
  }

  translateKey = (key) => {
    return [(key-key%boardWidth)/boardWidth, key%boardWidth];
  }

  translatePos = (pos) => {
    return pos[0]*boardWidth+pos[1];
  }

  calculateLine = (dir, pos) => {
    let sum = 0;
    const {play} = this.props
    const {squares} = this.state;
    for(let i = 1 ; i < 5; i += 1) {
      if(squares[pos[0]+i*dir[1]][pos[1]+i*dir[0]] !== play){
        break;
      }
      sum += 1
    }
    return sum;
  }

  calculateWin = (pos) => {
    const directions = [
      [[1,0], [-1,0]],
      [[0,1], [0,-1]],
      [[1,1], [-1,-1]],
      [[1,-1], [-1,1]]
    ];
    return (directions.map(dir => 
      dir.map(way => this.calculateLine(way,pos)).reduce((a, b) => a + b)).includes(4))
  }

  handleClick = (id) => {
    const {handleWin, play, handlePlayer, saveHistory} = this.props
    const {squares} = this.state
    const pos = this.translateKey(id)
    if(squares[pos[0]][pos[1]] === null) {
      this.setState({
        squares: squares.map((rows, i) => { 
          return rows.map((row, j) => {
            return (i===pos[0] && j===pos[1])? play : row
          })
        }),
      })
      saveHistory(pos)
      handlePlayer();
    }
    handleWin(this.calculateWin(pos));
  }

  render() {
    const {squares} = this.state;
    return (
      squares.map((rows, i) => 
        <div className="board__row">
          {rows.map((row, j) => 
          <Square id={this.translatePos([i,j])} chess={row} handleClick={this.handleClick}/>
          )}
        </div>
      ));
  }
}

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isWin: false,
      play: 'black',
      histories: []
    }
  }

  saveHistory = (pos) => {
    const {histories} = this.state;
    this.setState({
      histories: [...histories, pos]
    })
  }

  handlePlayer = () => {
    const {play} = this.state;
    this.setState({
      play: play === 'black' ? 'white' : 'black'
    })
  }

  handleWin = (win) => {
    if(win) {
      this.setState({
        isWin: win,
      })
    }
  }

  render() {
    const {play, isWin, histories} = this.state
    return (
      <div className='game'>
        <div>
          <span>next: {play}, {isWin ? 'last win' : ''}</span>
          <Board className='board' play={play} 
          handleWin={this.handleWin}
          saveHistory={this.saveHistory} 
          handlePlayer={this.handlePlayer} />
        </div>
        <ul className='histories'>
          {histories.map((history, idx) => 
            <li className='histories__item'><span>{idx%2 ? 'white': 'black'}</span>{history[0]},{history[1]}</li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
