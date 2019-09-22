
import React, {Component} from 'react';
import './about.sass';

class About extends Component{
  render() {
    return(
      <div className='page'>
        <div className='about'>
          <h2 className='about__title'> Hello !</h2>
          <p>
            I am Min Wei, an interaction designer and front end developer with background in service science. I am passionate about crafting an amazing moment in digital service and making things happen.  I love to create some animation in my free time. 
          </p>
          <p>
            Currently I just finished my Master in Service Science at NTHU, and focus on data visualization.
          </p>
          <hr />
          <p>
            我是魏敏，目前是一個互動設計師與前端工程師，畢業自服務科學背景，喜歡創造、打造數位體驗中的驚奇體驗，平時休息時間喜歡看動畫、做動畫。
          </p>
          <p>
            目前才完成在清大服務科學研究所的碩士學位，並且研究數據視覺化相關的議題。
          </p>
        </div>
      </div>
    )
  }
}

export default About;
