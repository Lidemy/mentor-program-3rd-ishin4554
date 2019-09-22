import React, {Component} from 'react';
import { postAPI } from '../common/APIUtlis';

class FormCategories extends Component{
  constructor(props) {
    super(props)
    this.state = {
      categories: '',
    }
  }

  handleCategoriesData = async () => {
    this.setState({
      categories: await postAPI.getAllCategories(),
    })
  }

  componentDidMount() {
    this.handleCategoriesData();
  }

  render() {
    const {handleChange} = this.props
    const {categories, selected} = this.state
    return (
      <select onChange={handleChange} value={selected}>
        {categories && categories.map(category => {
          return <option value={category.category}>{category.category}</option>
        })}
      </select>
    )
  }
}

export default FormCategories;
