import React, {Component} from 'react';
import './posts.sass';
import Eye from '../../common/eye';
import '../../common/eye.sass';
import Post from './post';
import Footer from '../footer';
import Loading from '../loading';

class Posts extends Component{
  constructor(props) {
    super(props)
    this.state = {
      tag: '',
      category: this.props.match.params.category || 'work',
      isLoadingAnimation: true,
    }
  }

  handleLoading = (evt) => {
    if(evt.animationName === 'page__trans') {
      this.setState({
        isLoadingAnimation: false
      })
    }
  }

  getList = () => {
    const { getPostsList } = this.props;
    const { category } = this.state;
    getPostsList(category);
  }

  handleFilter = (evt) => {
    const value = Object.assign({}, evt).target.attributes.value.value;
    this.setState({
      tag: value
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
        tag: '',
        category: this.props.match.params.category, 
        isLoadingAnimation: true
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

    const { tag, category, isLoadingAnimation } = this.state;
    const isLoadingData = isLoadingCreatePost || isLoadingGetPostsList 
    || isLoadingDeletePost || isLoadingEditPost;
    const isLoading = isLoadingData || isLoadingAnimation;
    return(
      <div className='posts'>
        {isLoading && 
          <Loading isLoadingData={isLoadingData}
            handleLoading={this.handleLoading}/>}
        {!isLoadingData && <h1>HI, I'M MIN WEI</h1> }  
        {!isLoadingData && category==='work' && 
        <div className='slogan'>I am an 
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
          {!isLoadingData &&
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
