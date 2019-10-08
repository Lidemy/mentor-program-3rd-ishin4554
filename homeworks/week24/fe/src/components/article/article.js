import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Markdown } from 'react-showdown';
import './article.sass';

import Footer from '../footer';
import Loading from '../loading';

class Article extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.getPost()
  }

  getPost() {
    const { getPost } = this.props;
    const postId = this.props.match.params.id
    getPost(postId);
  }

  handleCardDelete = () => {
    const { history } = this.props; 
    const postId = this.props.match.params.id
    this.props.deletePost(postId);
    history.goBack();
  }

  render() {
    const { post, isLogin, isLoadingGetPost} = this.props;
    return(
      <div className='article'>
        {isLoadingGetPost && <Loading />}
        <img src={post.img_url}></img>
        <div className='page__main'>
          <div className='page__handler'>
            <h1 className='page__title'>{post.title}</h1>
            <nav>
              {isLogin && <button data-value={post.id} 
                onClick={this.handleCardDelete} className='btn__delete'>刪除</button>}
              {isLogin && <Link to={`/edit/post/${post.id}`}>編輯</Link>}
            </nav>
          </div>
          <p className='page__content'>
            <Markdown markup={post.content} className='markdown'/>
          </p>
        </div>
        <div className='page'>
        </div>
        {!isLoadingGetPost && <Footer/>}
      </div>
    )
  }
}

export default Article;

