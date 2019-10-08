import React, {Component} from 'react';
import './editorTag.sass';

class Tag extends Component {
  constructor(props) {
    super(props)
  }

  handleClick = (evt) => {
    const { handleChange } = this.props;
    handleChange(evt.target.value)
  } 

  render() {
    const { tag, tagType } = this.props
    return(
      <div className={`tag ${tagType}`}>
        <label className='tag__label' 
          htmlFor={tag}>{tag}</label>
        <input className='tag__box' type='checkbox' 
          value={tag} id={tag} name='tags' 
          onChange={this.handleClick}/>
      </div>
    )
  }
}

class EditorTags extends Component{
  constructor(props) {
    super(props)
    this.state = {
      tagInput: '',
      selected: []
    }
  }

  handleInputChange = (evt) => {
    this.setState({
      tagInput : evt.target.value
    })
  }

  handleSelected = (clickedTag) => {
    const { selected } = this.state;
    if(selected.indexOf(clickedTag) !== -1) {
      this.setState({
        tagInput: '',
        selected: selected.filter(item => item !== clickedTag)
      })
    } else {
      this.setState({
        tagInput: '',
        selected: [...selected, clickedTag]
      })
    }
  }

  componentDidUpdate(prevProps, prevState){
    if(prevProps.default !== this.props.default) {
      this.setState({
        selected: this.props.default
      })
    }
    if(prevState.selected !== this.state.selected) {
      this.props.handleTags(this.state.selected);
    }
  }

  render() {
    const { tagInput, selected } = this.state;
    const { tags } = this.props;
    const isInTags = tags.includes(tagInput) || selected.includes(tagInput);
    return(
      <div className='tag__wrapper'>
        <input type='text' name='tag' 
          value={tagInput} onChange={this.handleInputChange}
          placeholder='搜尋或新增標籤' />
        <div className='tag__container'>
          {tagInput && !isInTags && 
            <Tag tag={tagInput} tagType={'added'}
              handleChange={this.handleSelected}/>
          }
          {tagInput && 
            tags.map(tag => 
              tag.includes(tagInput) && selected.indexOf(tag) === -1 &&
              <Tag tag={tag} tagType={'suggested'}
                handleChange={this.handleSelected}/>
          )}
          {selected && 
            selected.map(tag => 
              <Tag tag={tag} tagType={'selected'}
                handleChange={this.handleSelected} />)}
        </div>
      </div>
    )
  } 
}

export default EditorTags;
