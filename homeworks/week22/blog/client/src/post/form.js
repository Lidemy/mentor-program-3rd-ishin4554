import React, {Component} from 'react';
import { Markdown } from 'react-showdown';
import './form.sass';
import  FormTags from './formTags';
import  FormCategories from './formCategories';

class Form extends Component{
  constructor(props) {
    super(props)
    this.state = {
      article: {
        title: '',
        content: '',
        user_id: 1,
        html: '',
        tags: [],
        category: '',
      },
      isChecked: null
    }
  }

  handleCheckChange = (tags) => {
    this.setState({
      article: {
        ...this.state.article,
        tags: tags
      }
    })
  }

  handleSelectChange = (evt) => {
    this.setState({
      article: {
        ...this.state.article,
        category: evt.target.value
      }
    })
  }

  handleInputChange = (evt) => {
    this.setState({
      article: {
        ...this.state.article,
        [evt.target.name] : evt.target.value
      }
    })
  }

  growTextarea = (evt) => {
    let adjustedHeight = evt.target.clientHeight;
    adjustedHeight = Math.max(evt.target.scrollHeight, adjustedHeight);
    if (adjustedHeight > evt.target.clientHeight){
      evt.target.style.height = adjustedHeight + 'px';
    }  
  }

  handleSubmit = (evt) => {
    const {handleForm} = this.props;
    handleForm(evt, this.state.article)
  }

  togglePreview = (evt) => {
    this.setState({
      isChecked: evt.target.checked
    }) 
  }

  componentDidUpdate(prevProps) {
    const {formData} = this.props;
    const {article} = this.state
    if(formData !== prevProps.formData) {
      this.setState({
        article: {
          ...article,
          title: formData.title,
          content: formData.content,
          html: formData.img_url,
          tags: formData.tags,  
          category: formData.category,
        }
      })
    }
  }

  render() {
    const {isChecked, article} = this.state;
    return(
      <div className='input__container'>
          <div className='input__nav'>
            <h1>文章設定</h1> 
            <div className='nav__right'>
              <FormCategories originCategory={article.category}
                handleChange={this.handleSelectChange}/>
              <FormTags originTags={article.tags}
                handleChange={this.handleCheckChange}/>
              <div className='input__preview'>
                <label htmlFor='preview'>預覽</label>
                <input type='checkbox' id='preview' 
                  onChange={this.togglePreview}></input>
              </div>
              <input onClick={this.handleSubmit} type='submit' />
            </div>
          </div>
          {!isChecked &&
          <form>
            <div className='input__section'>
              <input type='text' name='title' value={article.title} 
                onChange={this.handleInputChange} 
                placeholder='文章標題'/>
              <textarea name='content' value={article.content} 
                onKeyUp={this.growTextarea}
                onChange={this.handleInputChange} 
                placeholder='文章內容'/>
            </div>
          </form>
        }
        {
          isChecked && 
          <div className='preview'>
            <Markdown markup={article.content} className='markdown'/>
          </div> 
        }
      </div>
    )
  }
}

export default Form;
