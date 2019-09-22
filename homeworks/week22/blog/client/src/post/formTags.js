import React, {Component} from 'react';
import { postAPI } from '../common/APIUtlis';
import './formTags.sass';
class FormTags extends Component{
  constructor(props) {
    super(props)
    this.state = {
      tags: '',
      tagInput: '',
      selected: []
    }
  }

  handleTagsData = async () => {
    const tagsObj = await postAPI.getAllTags();
    this.setState({
      tags: await tagsObj.map(tag => tag.tag)
    })
  }

  handleInputChange = (evt) => {
    this.setState({
      tagInput : evt.target.value
    })
  }

  toggleClass = (evt) => {
    evt.target.classList.toggle('checked');
  }
  
  toggleTag = (evt) => {
    const {tags, selected} = this.state;
    const checked = evt.target.value;
    if(selected.indexOf(evt.target.value) === -1) {
      this.setState({
        tags: tags.filter(tag => tag!==checked),
        selected: [...selected, checked]
      })
    } else {
      this.setState({
        tags: [...tags, checked],
        selected: selected.filter(selected => selected!==checked)
      })
    }
  }

  clearInput = () => {
    const {selected, tagInput} = this.state;
    const input = tagInput;
    this.setState({
      tagInput: '',
      selected: [...selected, input]
    })
  }

  componentDidMount() {
    this.handleTagsData();
    console.log(this.props.originTags)
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.originTags !== prevProps.originTags) {
      console.log(this.props.originTags)
    }
    if(this.state.selected !== prevState.selected) {
      this.props.handleChange(this.state.selected);
    }
  }
  
  render() {
    const {tags, tagInput, selected} = this.state;
    return(
      <div className='tag__wrapper'>
        <input type='text' name='tag' 
        value={tagInput} onChange={this.handleInputChange}
        placeholder='搜尋或新增標籤'></input>
        <div className='tag__container'>
          {tagInput && !tags.includes(tagInput) && 
            !selected.includes(tagInput) && 
            <div className='tag__add' onClick={this.clearInput}> + {tagInput}</div>}
          {tagInput && tags && tags.map(tag => {
            if(tag.includes(tagInput)){
              return (
                <div className='tag'>
                  <label className='tag__label' htmlFor={tag} 
                    onClick={this.toggleClass}>{tag}</label>
                  <input className='tag__box' type='checkbox' 
                    value={tag} id={tag}
                    onChange={this.toggleTag}/>
                </div>
              );
            } 
          })}
          {selected && selected.map((tag) => {
            return (
              <div className='tag checked'>
                <label className='tag__label' htmlFor={tag} 
                  onClick={this.toggleClass}> V {tag}</label>
                <input className='tag__box' type='checkbox' 
                  value={tag} id={tag}
                  onChange={this.toggleTag}/>
              </div>
            )
          })}
        </div>
      </div>
    )
  } 
}

export default FormTags;
