import React, { Component } from "react";

import styled from "styled-components";

import { Link } from "react-router-dom";
import axios from "axios";

const TodoTd = styled.td`
  text-decoration: ${props =>
    props.todo_completed ? "line-through" : "inherit"};
`;

const Todo = props => (
  <tr>
    <TodoTd todo_completed={props.todo.todo_completed}>
      {props.todo.todo_description}
    </TodoTd>
    <TodoTd todo_completed={props.todo.todo_completed}>
      {props.todo.todo_responsible}
    </TodoTd>
    <TodoTd todo_completed={props.todo.todo_completed}>
      {props.todo.todo_priority}
    </TodoTd>
    <td>
      <Link to={"/edit/" + props.todo._id}>Edit</Link>
    </td>
  </tr>
);

export default class TodosList extends Component {
  constructor(props) {
    super(props);
    this.state = { todos: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:4000/todos/")
      .then(response => {
        this.setState({ todos: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  todoList() {
    return this.state.todos.map(function(currentTodo, i) {
      return <Todo todo={currentTodo} key={i} />;
    });
  }

  render() {
    return (
      <div>
        <h3>Todos List</h3>
        <table className="table table-striped" style={{ marginTop: 20 }}>
          <thead>
            <tr>
              <th>Description</th>
              <th>Responsible</th>
              <th>Priority</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{this.todoList()}</tbody>
        </table>
      </div>
    );
  }
}
