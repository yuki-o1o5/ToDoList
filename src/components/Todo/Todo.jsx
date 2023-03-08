import React from "react";
import "./Todo.css";

function Todo({ todo, watchingCheckBox }) {
  const handleTodoClick = () => {
    watchingCheckBox(todo.id);
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
        </label>
        {todo.name}
      </div>
      <button className="removeButton">x</button>
    </div>
  );
}

export default Todo;
