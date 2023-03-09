import React from "react";
import "./Todo.css";

function Todo({ todo, watchingCheckBox, handleRemoveTodo }) {
  const handleTodoClick = () => {
    watchingCheckBox(todo.id);
  };

  const handleRemoveClick = () => {
    handleRemoveTodo(todo.id);
  };

  return (
    <div className="toDoControler">
      <div className="writtenTaskContainer">
        <label>
          <input
            type="checkbox"
            checked={todo.isCompleted}
            readOnly
            onChange={handleTodoClick}
          />
          <div>{todo.name}</div>
        </label>
      </div>
      <button className="removeButton" onClick={handleRemoveClick}>
        x
      </button>
    </div>
  );
}

export default Todo;
