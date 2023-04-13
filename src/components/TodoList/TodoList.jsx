import { HiOutlineXMark } from "react-icons/hi2";
import React, { useContext, useReducer } from "react";
import { AppContext } from "../../App";
import "./TodoList.css";

export function TodoList() {
  const { state, dispatch } = useContext(AppContext);
  return (
    <>
      <input
        type="text"
        className="newInput"
        placeholder="What needs to be done?"
        onKeyDown={(event) => dispatch({ type: "CREATE_TASK", content: event })}
        autoFocus
      />

      {state.todos.map((eachTodo) => {
        return <Todo eachTodo={eachTodo} key={eachTodo.id} />;
      })}
    </>
  );
}

// In Upper code, I have to set the state as a global value and I have to do filtering.

function Todo({ eachTodo }) {
  const { state, dispatch } = useContext(AppContext);

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
