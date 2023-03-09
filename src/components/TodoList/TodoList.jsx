import React from "react";
import Todo from "../Todo/Todo";

function TodoList({ todos, watchingCheckBox, handleRemoveTodo}) {
  return todos.map((todo) => (
    <Todo todo={todo} key={todo.id} watchingCheckBox={watchingCheckBox} handleRemoveTodo={handleRemoveTodo} />
  ));
}

export default TodoList;
