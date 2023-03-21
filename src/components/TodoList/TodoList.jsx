import { HiOutlineXMark } from "react-icons/hi2";
import React, { useContext } from "react";
import { useRef } from "react";
import "./TodoList.css";
import FilteredTodosContext from "../../constants/filteredTodosContextApi";
import TodosContext from "../../constants/todosContetApi";

export function TodoList() {
  const { filteredTodos } = useContext(FilteredTodosContext);

  return filteredTodos.map((todo) => (
    <TodosContext.Provider value={todo} key={todo.id}>
      <Todo />
    </TodosContext.Provider>
  ));
}

export function Todo() {
  const todos = useContext(TodosContext);

  const { watchingCheckBox, handleRemoveTodo, reEditTodoName } =
    useContext(FilteredTodosContext);

  const labelRef = useRef();

  const handleTodoClick = () => {
    watchingCheckBox(todos.id);
  };

  const handleRemoveClick = () => {
    handleRemoveTodo(todos.id);
  };

  const reEdit = () => {
    if (labelRef.current.textContent.length === 0) {
      handleRemoveTodo(todos.id);
    } else {
      const reEditName = labelRef.current.textContent;
      reEditTodoName(todos.id, reEditName);
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
          checked={todos.isCompleted}
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
          {todos.name}
        </label>
      </div>
      <button className="removeButton" onClick={handleRemoveClick}>
        <HiOutlineXMark />
      </button>
    </div>
  );
}
