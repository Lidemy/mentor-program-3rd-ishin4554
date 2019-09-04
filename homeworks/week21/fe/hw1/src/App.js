import React, {Component} from 'react';
import TodoItem from './todo.js';

class App extends Component{
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      todoText: ''
    }
  }

  handleChange = (evt) => {
    this.setState({
      todoText: evt.target.value
    })
  }

  addTodo = () => {
    const {todos, todoText} = this.state;
    this.setState({
      todos: [...todos, {
        id: this.id,
        isComplted: false,
        text: todoText
      }],
      todoText: '',
    })
    this.id += 1
  }

  deleteTodo = (id) => {
    this.setState({
      todos: this.state.todos.filter(todo => todo.id !== id)
    })
  }

  markTodo = (id) => {
    this.setState({
      todos: this.state.todos.map(todo => {
        if (todo.id !== id) {
          return todo 
        } 
        return {
          ...todo,
          isComplted: !todo.isComplted
        }
      })
    })
  }
  
  render (){
    const { todos, todoText } = this.state;
    return (
      <div className='container'>
        <div className='row justify-content-md-center'>
          <input type='text' value={todoText} onChange={this.handleChange}></input>
          <button onClick={this.addTodo}> add </button>
        </div>
        <div className='row justify-content-md-center'>
          <ul class="list-group">
            {todos.map(todo => (
              <TodoItem key={todo.id} todo={todo} 
              deleteTodo={this.deleteTodo} markTodo={this.markTodo}/>
            ))}  
          </ul>
        </div>
      </div>
    );
  }
}

export default App;
