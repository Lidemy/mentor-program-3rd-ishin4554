import React, {Component} from 'react';
import { Markdown } from 'react-showdown';

import  EditorTag from './editorTag';
import  EditorCategory from './editorCategory';
import './editor.sass';


class Editor extends Component{
  constructor(props) {
    super(props)
    this.state = {
      isChecked: null,
      category: '',
      tag: [],
      title: '',
      content: '', 
    }
  }

  handleInputChange = (evt) => {
    this.setState({
      [evt.target.name] : evt.target.value
    })
  }

  handleTags = (tag) => {
    this.setState({
      tag
    })
  }

  growTextarea = (evt) => {
    let adjustedHeight = evt.target.clientHeight;
    adjustedHeight = Math.max(evt.target.scrollHeight, adjustedHeight);
    if (adjustedHeight > evt.target.clientHeight){
      evt.target.style.height = adjustedHeight + 'px';
    }  
  }

  togglePreview = (evt) => {
    this.setState({
      isChecked: evt.target.checked
    }) 
  }

  handleSubmit = () => {
    const { category, title, content, tag } = this.state;
    const { history, match } = this.props;
    const post = {
      category,
      title,
      content,
      tag, 
    }
    if(match.params.method === 'edit') {
      this.props.editPost(match.params.id, post)
    } else {
      this.props.createPost(post)
    }
    history.push('/work');
  }

  componentDidMount() {
    const { match, post } = this.props;
    this.props.getCategories();
    this.props.getTags();
    if(match.params.method === 'edit') {
      this.setState({
        category: post.category,
        tag: post.tags,
        title: post.title,
        content: post.content 
      })
    }
  }

  render() {
    const { isChecked, title, content, tag, category } = this.state;
    const { categories, tags } = this.props;
    return(
      <div className='input__container'>
          <div className='input__nav'>
            <h1>文章設定</h1> 
            <div className='nav__right'>
              <EditorCategory handleCategory={ this.handleInputChange }
                categories={ categories } default={ category } />
              <EditorTag handleTags={ this.handleTags } 
                tags={ tags } default={ tag } />
              <div className='input__preview'>
                <label htmlFor='preview'>預覽</label>
                <input type='checkbox' id='preview' 
                  onChange={ this.togglePreview }></input>
              </div>
              <button onClick={ this.handleSubmit } > 送出 </button>
            </div>
          </div>
          {!isChecked &&
          <form>
            <div className='input__section'>
              <input type='text' name='title' value={title} 
                onChange={this.handleInputChange} 
                placeholder='文章標題'/>
              <textarea name='content' value={content} 
                onKeyUp={this.growTextarea}
                onChange={this.handleInputChange} 
                placeholder='文章內容'/>
            </div>
          </form>
        }
        {
          isChecked && 
          <div className='preview'>
            <Markdown markup={content} className='markdown'/>
          </div> 
        }
      </div>
    )
  }
}

export default Editor;
