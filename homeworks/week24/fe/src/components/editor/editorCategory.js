import React, {Component} from 'react';

class EditorCategory extends Component{
  constructor(props) {
    super(props);
  }

  handleChange = (evt) => {
    this.props.handleCategory(evt);
  }

  render() {
    const { categories } = this.props;
    return (
      <select value={this.props.default || "DEFAULT"} 
        onChange={this.handleChange} name='category'>
        <option value="DEFAULT" disabled>Choose a salutation ...</option>
        {categories.map(category => {
          return <option value={category}>{category}</option>
        })}
      </select>
    )
  }
}

export default EditorCategory;
