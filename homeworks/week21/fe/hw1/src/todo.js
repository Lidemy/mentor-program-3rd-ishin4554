import React, {Component} from 'react';
import './todoItem.css';

class TodoItem extends Component{
  constructor(props) {
    super(props)
    
  }
  
  delete = () => {
    const {todo, deleteTodo} = this.props
    deleteTodo(todo.id)
  }

  mark = () => {
    const {todo, markTodo} = this.props
    markTodo(todo.id)
  }

  render() {
    const { key, todo } = this.props;
    return (
      <li key={key} className={todo.isComplted ? 'list-group-item-dark list-group-item' : 'list-group-item'}>        
        <span className=''>{ todo.text }</span>
        <span className='todoItem__btn badge badge-success' onClick={this.mark}>finish</span>
        <span className='todoItem__btn badge badge-danger' onClick={this.delete}>delete</span>
      </li>
    );
  }
}

export default TodoItem;
