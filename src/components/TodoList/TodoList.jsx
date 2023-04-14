import { HiOutlineXMark } from "react-icons/hi2";
import React, { useContext } from "react";
import { AppContext } from "../../App";
import "./TodoList.css";

export function TodoList() {
  const { state, dispatch } = useContext(AppContext);

  // ----------------------------------------------------------------
  // Change todos by the status
  // todos.isCompleted = false => "active"
  // todos.isCompleted = true  => "completed"
  // ----------------------------------------------------------------

  const filteredTodos = state.todos.filter((todo) => {
    if (state.status === "active") {
      return !todo.isCompleted;
    } else if (state.status === "completed") {
      return todo.isCompleted;
    } else {
      return true;
    }
  });

  return (
    <>
      <input
        type="text"
        className="newInput"
        placeholder="What needs to be done?"
        onKeyDown={(event) => dispatch({ type: "CREATE_TASK", content: event })}
        autoFocus
      />

      {filteredTodos.map((eachTodo) => {
        return <Todo eachTodo={eachTodo} key={eachTodo.id} />;
      })}

      <div className="footerContainer">
        <div className="itemNumber">
          {state.todos.filter((todo) => !todo.isCompleted).length < 2
            ? `${
                state.todos.filter((todo) => !todo.isCompleted).length
              } task left`
            : `${
                state.todos.filter((todo) => !todo.isCompleted).length
              } tasks left `}
        </div>
        <div className="buttonContainer">
          <button
            className={state.status === "all" ? "button active" : "button"}
            onClick={() => dispatch({ type: "ClICK_ALL" })}
          >
            All
          </button>
          <button
            className={state.status === "active" ? "button active" : "button"}
            onClick={() => dispatch({ type: "ClICK_ACTIVE" })}
          >
            Actives
          </button>
          <button
            className={
              state.status === "completed" ? "button active" : "button"
            }
            onClick={() => dispatch({ type: "ClICK_COMPLETED" })}
          >
            Completed
          </button>
        </div>
      </div>
    </>
  );
}

function Todo({ eachTodo }) {
  const { dispatch } = useContext(AppContext);

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
          onChange={() =>
            dispatch({ type: "HANDLE_CHECKBOX", content: eachTodo })
          }
        />
        <label
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(event) =>
            dispatch({
              type: "REEDIT_TASK",
              content: event,
              content2: eachTodo.id,
            })
          }
          onKeyDown={preventDefault}
        >
          {eachTodo.name}
        </label>
      </div>
      <button
        className="removeButton"
        onClick={() => dispatch({ type: "REMOVE_TASK", content: eachTodo.id })}
      >
        <HiOutlineXMark />
      </button>
    </div>
  );
}
