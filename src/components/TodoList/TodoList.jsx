// import { useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import React, { useContext } from "react";
import { AppContext } from "../../App";
// import { useRef } from "react";
import "./TodoList.css";

export function TodoList({ allTodos }) {
  // const { todos } = useContext(AppContext);

  // filter: active, all, completed

  // todo.status: active, completed

  // return todos.filter((todo) => (
  //   if (filter === 'all') {
  //     return <Todo todo={todo} />
  //   }
  //   if (filter === todo.status) {
  //     return <Todo todo={todo} />
  //   }

  // ));
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

  //   // custom hooks -> update todos
  //   todos = todos.filter((todo) => todo.id !== id);
  // }

  // const handleToggleActive = () => {
  //   todos = todos.map((todo) => {
  //     if (todo.id === id) {
  //       todo.status = 'active';
  //     }
  //   });

  //   updateTodos(todos);

  // }

  // const todos = useContext(TodosContext);

  // const { watchingCheckBox, handleRemoveTodo, reEditTodoName } =
  //   useContext(FilteredTodosContext);

  // const labelRef = useRef();

  // const handleTodoClick = () => {
  //   watchingCheckBox(todos.id);
  // };
  // ----------------------------------------------------------------
  // reedit Todo task
  // ----------------------------------------------------------------
  const reEditTask = (event) => {
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
          // onChange={handleCheckBox()}
        />
        <label
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(event) => reEditTask(event)}
          // ref={labelRef}
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
