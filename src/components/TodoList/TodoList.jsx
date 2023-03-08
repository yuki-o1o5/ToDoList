import React from "react";
import Todo from "../Todo/Todo";

function TodoList({ todos, watchingCheckBox }) {
  return todos.map((todo) => (
    <Todo todo={todo} key={todo.id} watchingCheckBox={watchingCheckBox} />
  ));
}

export default TodoList;
