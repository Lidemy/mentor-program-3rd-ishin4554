import React, {Component} from 'react';
import './loading.sass';

class Loading extends Component{
  constructor(props) {
    super(props)
  }

  render() {
    const {handleLoading} = this.props
    return(
      <div className='loading__background' onAnimationEnd={handleLoading} >
      </div>
    )
  }
}

export default Loading;
