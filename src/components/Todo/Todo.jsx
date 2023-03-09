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

  const reEdit = () => {
    if (labelRef.current.textContent.length === 0) {
      handleRemoveTodo(todo.id);
    } else {
      const reEditName = labelRef.current.textContent;
      reEditTodoName(todo.id, reEditName);
    }
  };

  const preventDefault = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
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
          onBlur={reEdit}
          ref={labelRef}
          onKeyDown={preventDefault}
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
