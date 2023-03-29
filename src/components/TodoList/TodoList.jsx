import { HiOutlineXMark } from "react-icons/hi2";
import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./TodoList.css";

export function TodoList({ allTodos }) {
  return (
    <>
      {allTodos.map((eachTodo) => {
        return <Todo eachTodo={eachTodo} key={eachTodo.id} />;
      })}
    </>
  );
}

function Todo({ eachTodo }) {
  const { todos, setTodos } = useContext(AppContext);

  // ----------------------------------------------------------------
  // Remove Todo task (Current todo matches one of the todos from AppContext and remove from todos)
  // ----------------------------------------------------------------
  const handleRemove = (id) => {
    const updatedTodosByRemove = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodosByRemove);
  };

  // ----------------------------------------------------------------
  // Change Todo status
  // ----------------------------------------------------------------

  const handleCheckBox = () => {
    const updatedTodosByToggle = todos.map((todo) =>
      todo.id === eachTodo.id
        ? { ...todo, isCompleted: !eachTodo.isCompleted }
        : todo
    );
    setTodos(updatedTodosByToggle);
  };

  // ----------------------------------------------------------------
  // reEdit Todo task
  // ----------------------------------------------------------------
  const handleReEditTask = (event) => {
    if (event.target.textContent.length === 0) {
      handleRemove(eachTodo.id);
    } else {
      const reEditTaskName = event.target.textContent;
      const updatedTodosByReEdit = todos.map((todo) =>
        todo.id === eachTodo.id ? { ...todo, name: reEditTaskName } : todo
      );
      setTodos(updatedTodosByReEdit);
    }
  };

  // ----------------------------------------------------------------
  // Prevent line break when I click the enter key
  // ----------------------------------------------------------------
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
          checked={eachTodo.isCompleted}
          onChange={handleCheckBox}
        />
        <label
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(event) => handleReEditTask(event)}
          onKeyDown={preventDefault}
        >
          {eachTodo.name}
        </label>
      </div>
      <button
        className="removeButton"
        onClick={() => handleRemove(eachTodo.id)}
      >
        <HiOutlineXMark />
      </button>
    </div>
  );
}

//   // custom hooks -> update todos
//   todos = todos.filter((todo) => todo.id !== id);
// }

