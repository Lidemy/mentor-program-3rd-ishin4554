import React, {Component} from 'react';
import './loading.sass';

class Loading extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isEnd: false
    }
  }
  componentDidUpdate(prevProps) {
    if(this.props.isLoadingData !== prevProps.isLoadingData &&
      !this.props.isLoadingData) {
        this.setState({
          isEnd: true
        })
    }
  }
  render() {
    const {handleLoading} = this.props
    const {isEnd} = this.state
    return(
      <div className={isEnd? 'loading__background loading__end': 'loading__background'}
        onAnimationEnd={handleLoading}>
        <div className='square'>
        </div>
        <h1>Loading</h1>
      </div>
    )
  }
}

export default Loading;
