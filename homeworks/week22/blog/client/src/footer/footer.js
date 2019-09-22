import React, {Component} from 'react';
import './footer.sass';

class Footer extends Component{

  componentDidMount() {
    document.addEventListener('scroll', this.handleBoundary);
  }

  render() {
    return(
      <div className='footer'>
        <h2 className='footer__title'>Contact Me</h2>
        <div className='footer__link'>
          <ul>
            <li>ishin4554@gmail.com</li>
            <li>Linkined ICON</li>
            <li>Medium ICON</li>
            <li>Back To Top</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default Footer;
