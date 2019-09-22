import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import './postList.sass';
import Eye from '../common/eye';
import '../common/eye.sass';
import Loading from '../common/loading';
import Footer from '../footer/footer';

import { postAPI } from '../common/APIUtlis';

class PostCard extends Component{

  showImg = () => {
    const {post} = this.props;
    Eye.hugifyEye(post.img_url);
    Eye.openEye();
  }

  removeImg = () => {
    Eye.resetEye();
    Eye.closeEye();
  }

  render() {
    const {post, id} = this.props;
    return(
      <div className='article__item'>
        <div className='article__tags'>
          {post.tags && post.tags.map(item => <div className='tag'>{item}</div>)}
        </div>
        <Link to={`/post/${id}`}>
          <h3 className='article__title' text-value={post.title}
            onMouseOver={this.showImg} onMouseOut={this.removeImg} 
            onClick ={this.removeImg}>{post.title}</h3>
        </Link>
      </div>
    )
  }
}

class PostList extends Component{
  constructor(props) {
    super(props)
    this.state = {
      posts: null,
      tagCategory: []
    }
  }

  handlePostsData = async () => {
    this.setState({
      posts: await postAPI.getAllPosts()
    })
  }

  handleTag = (evt) => {
    if(evt.target.innerText === 'Interaction') {
      this.setState({
        tagCategory: ['ixd', 'ux', 'ui']
      }) 
    } else {
      this.setState({
        tagCategory: ['front end', 'back end', 'MongoDB']
      }) 
    }
  }

  componentDidMount() {
    this.handlePostsData();
  }

  render() {
    const {posts, tagCategory} = this.state;
    const {auth, category} = this.props;
    console.log(this.state)
    if(posts) {
      return(
        <div className='article'>
          <h1>MIN WEI</h1>
          <div className='intro__slogan'>I'm an 
            <span className='tab' text-value='Interaction' 
              onMouseOver ={Eye.openEye} onMouseOut ={Eye.closeEye}
              onClick={this.handleTag}>
                Interaction</span> Designer and 
            <span className='tab' text-value='Developer'
              onMouseOver ={Eye.openEye} onMouseOut ={Eye.closeEye}
              onClick={this.handleTag}>
                Front End</span> Developer</div>
          <div className='article__container'>
            {posts.map((post, idx) => 
              post.category === category && 
              (post.tags.filter(tag => tagCategory.includes(tag)).length !== 0 || 
                tagCategory.length === 0) && 
              <PostCard auth = {auth} id={post.id} key={idx} 
                post={post} getAllPosts={this.getAllPosts} />
            )}
          </div>
          <Footer />
        </div>
      );
    } else {
      return(
        <Loading/>
      );
    }

  }
}

export default PostList;
