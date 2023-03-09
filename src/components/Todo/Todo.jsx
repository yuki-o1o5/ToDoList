import React from "react";
import { useRef } from "react";
import "./Todo.css";

function Todo({ todo, watchingCheckBox, handleRemoveTodo, reEditTodoName }) {
  const labelRef = useRef();

  const handleTodoClick = () => {
    watchingCheckBox(todo.id);
  };

  const handleRemoveClick = () => {
    handleRemoveTodo(todo.id);
  };

  const reEdit = (event) => {
    if (labelRef.current.textContent.length > 0 && event.key === "Enter") {
      const reEditName = labelRef.current.textContent;
      reEditTodoName(todo.id, reEditName);
    }
  };

  return (
    <div className="toDoControler">
      <div className="writtenTaskContainer">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          readOnly
          onChange={handleTodoClick}
        />{" "}
        <label
          contentEditable={true}
          suppressContentEditableWarning={true}
          onKeyDown={reEdit}
          ref={labelRef}
        >
          {todo.name}
        </label>
      </div>
      <button className="removeButton" onClick={handleRemoveClick}>
        x
      </button>
    </div>
  );
}

export default Todo;
