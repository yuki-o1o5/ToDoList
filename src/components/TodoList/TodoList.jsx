import React from "react";
import Todo from "../Todo/Todo";

function TodoList({
  todos,
  watchingCheckBox,
  handleRemoveTodo,
  reEditTodoName,
}) {
  return todos.map((todo) => (
    <Todo
      todo={todo}
      key={todo.id}
      watchingCheckBox={watchingCheckBox}
      handleRemoveTodo={handleRemoveTodo}
      reEditTodoName={reEditTodoName}
    />
  ));
}

export default TodoList;
