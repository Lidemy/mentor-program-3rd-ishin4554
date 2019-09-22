import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import { Markdown } from 'react-showdown';
import './article.sass';
import Loading from '../common/loading';
import Footer from '../footer/footer';

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      post: null
    }
  }

  getPost(id) {
    fetch(`/api/posts/${id}`)
    .then(res => res.json())
    .then(data => this.setState({
      post: data
    }))
  }

  componentDidMount() {
    this.getPost(this.props.match.params.id);
  }

  handleCardDelete = (evt) => {
    const {history} = this.props
    const id = Number(evt.target.attributes['data-value'].value);
    evt.preventDefault();
    fetch(`/api/posts/${id}`,{
      method: 'DELETE'
    }).then(() => history.push('/work/'));
  }

  render() {
    const {post} = this.state;
    const {auth} = this.props;
    if(post) {
      return(
        <div className='article'>
          <div className='back'>X</div>
          <img src={post.img_url} alt='landing'></img>
          <div className='page__main'>
            <div className='page__handler'>
              <h1 className='page__title'>{post.title}</h1>
              <nav>
                {auth && post ? <button data-value={post.id} onClick={this.handleCardDelete}>刪除</button> : ''}
                {auth && post ? <Link to={`/editPost/${post.id}`}>編輯</Link>: ''}
              </nav>
            </div>
            <p className='page__content'>{<Markdown markup={post.content} className='markdown'/>}</p>
          </div>
          <div className='page'>
            <Footer />
          </div>
        </div>
      )
    } else {
      return (
        <div className='page'>
          <Loading />
        </div>
      );
    }

  }
}

export default Article;

