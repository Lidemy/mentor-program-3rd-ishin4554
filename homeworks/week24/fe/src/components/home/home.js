import React, {Component} from 'react';
import './home.sass';
import Eye from '../../common/eye';
import '../../common/eye.sass';

class Home extends Component{
  constructor(props) {
    super(props)
    this.state = {
      displacement: 20,
      rotate: 50,
      offset: 10,
    }
  }
  componentDidMount() {
    this.updateCanvas();
  }
  componentWillUpdate(prevProps, prevState) {
    if(this.state !== prevState) {
      this.updateCanvas()
    }
  }

  handleRandom = () => {
    this.setState({
      displacement: Math.random()*100,
      rotate: Math.random()*100,
      offset: Math.random()*100,
    })
  }
  
  draw = (context, width, height) =>{
    const colorRandom = Math.random() < 0.5 ? '#FB2CB3' : '#3DECD7';
    const fillRandom = Math.random() < 0.5 ? true : false;

    context.beginPath();
    context.rect(-width/2, -height/2, width, height);
    context.strokeStyle=colorRandom;
    context.fillStyle=colorRandom;
    context.stroke();
    fillRandom && context.fill();
  }
  
  updateCanvas() {
    // initial set
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    let size = window.innerHeight
    let dpr = window.devicePixelRatio*2;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    ctx.lineWidth = 1;

    const squareSize = 90;
    const {displacement, rotate, offset} = this.state

    for(let i = squareSize; i <= size - squareSize; i += squareSize) {
      for(let j = squareSize; j <= size - squareSize; j+= squareSize) {
        let handleRotateDir = Math.random() < 0.5 ? -1 : 1;
        let rotateAmt = j / size * Math.PI / 180 * handleRotateDir * Math.random() * rotate;
        handleRotateDir = Math.random() < 0.5 ? -1 : 1;
        let transValue = j / size * handleRotateDir * Math.random() * displacement;
        ctx.save();
          ctx.translate(i + transValue + offset, j + offset);
          ctx.rotate(rotateAmt);
          this.draw(ctx, squareSize, squareSize);
        ctx.restore();
      }
    }
    
  }

  handleInstruction = () => {
    Eye.clickEye()
  }

  render() {
    return (
      <div className='landing'>
        <div className='landing__intro'>
          <h1>ISHIN</h1>
          <p>Focus on crafting amazing moment</p>
        </div>
        <canvas ref="canvas" onClick={this.handleRandom} 
          onMouseOver={Eye.clickEye} onMouseOut={Eye.noClickEye}/>
      </div>
    );
  }   
}

export default Home;

