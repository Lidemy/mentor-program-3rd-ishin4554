import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './posts.sass';

import Footer from '../footer';
import Loading from '../loading';
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

class Posts extends Component{
  constructor(props) {
    super(props)
    this.state = {
      tag: '',
      category: 'work',
      isLoadingAnimation: true
    }
  }

  getList = () => {
    const { getPostsList, match } = this.props;
    getPostsList(match.params.category);
  }

  handleFilter = (evt) => {
    const value = Object.assign({}, evt).target.attributes.value.value;
    this.setState({
      tag: value
    })
  }

  handleLoading = () => {
    this.setState({
      isLoadingAnimation: false
    })
  }

  componentDidMount() {
    const { 
      isLoadingCreatePost,
      isLoadingDeletePost, 
      isLoadingEditPost 
    } = this.props;
    const isLoading = isLoadingCreatePost
    || isLoadingDeletePost || isLoadingEditPost;
    !isLoading && this.getList();
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props
    if(prevProps.match.params.category !== match.params.category) {
      this.getList();
      this.setState({
        tag: ''
      })
    }
    if(prevProps.isLoadingEditPost !== this.props.isLoadingEditPost) {
      this.getList();
    }
    if(prevProps.isLoadingDeletePost !== this.props.isLoadingDeletePost) {
      this.getList();
    }
    if(prevProps.isLoadingCreatePost !== this.props.isLoadingCreatePost) {
      this.getList();
    }
  }

  render() {
    const { 
      postsList, 
      isLoadingGetPostsList, 
      isLoadingCreatePost,
      isLoadingDeletePost, 
      isLoadingEditPost 
    } = this.props;

    const { isLoadingAnimation } = this.state
    console.log(isLoadingAnimation)
    const { tag } = this.state;
    const isLoading = isLoadingCreatePost || isLoadingGetPostsList 
    || isLoadingDeletePost || isLoadingEditPost || isLoadingAnimation;

    return(
      <div className='posts'>
        {isLoading && <Loading handleLoading={this.handleLoading}/>}
        {!isLoading && <h1>MIN WEI</h1> }  
        {!isLoading && <div className='slogan'>I am an 
          <span className='slogan__tab' value='interaction' 
            onMouseOver ={Eye.openEye} onMouseOut ={Eye.closeEye} 
            onClick={this.handleFilter}>
              Interaction </span> Designer and 
          <span className='slogan__tab' value='front-end'
            onMouseOver ={Eye.openEye} onMouseOut ={Eye.closeEye}
            onClick={this.handleFilter}>
              Front-End </span> Developer
        </div>}
        <div className='posts__container'>
          {!isLoading && 
          postsList.filter(post => tag === '' ? true : 
            post.Tags.map(item => item.name).includes(tag))
            .map((post, idx) => 
              <Post key={idx} item={post}/> 
          )}
        </div>
        {!isLoading && <Footer />}
      </div>
    );
  }
}

export default Posts;
