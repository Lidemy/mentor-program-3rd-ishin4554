import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import Eye from '../../common/eye';
import '../../common/eye.sass';

class Post extends Component{
  constructor(props) {
    super(props)
  }

  showImg = () => {
    console.log('補 img_url')
    // const {post} = this.props;
    // Eye.hugifyEye(post.img_url);
    Eye.openEye();
  }

  removeImg = () => {
    Eye.resetEye();
    Eye.closeEye();
  }

  render() {
    const { item } = this.props;
    return(
      <div className='posts__item'>
        <div className='posts__tags'>
          {item.Tags.map((tag, idx) => <div key={idx} className='tag'>{tag.name}</div>)}
        </div>
        <Link to={`/post/${item.id}`}>
          <h3 className='posts__title' 
            text-value={item.title}
            onMouseOver={this.showImg}
            onMouseOut={this.removeImg}>{item.title}</h3>
        </Link>
      </div>
    )
  }
}

export default Post;