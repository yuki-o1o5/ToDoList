import { HiOutlineXMark } from "react-icons/hi2";
import React, { useContext, useMemo } from "react";
import { AppContext } from "../../App";
import "./TodoList.css";
import { actionTypes } from "../../App";

export function TodoList() {
  const { state, dispatch } = useContext(AppContext);

  // ----------------------------------------------------------------
  // Change todos by the status
  // todos.isCompleted = false => "active"
  // todos.isCompleted = true  => "completed"
  // ----------------------------------------------------------------

  const filteredTodos = useMemo(() => {
    return state.todos.filter((todo) => {
      if (state.status === "active") {
        return !todo.isCompleted;
      } else if (state.status === "completed") {
        return todo.isCompleted;
      } else {
        return true;
      }
    });
  }, [state.status, state.todos]);

  return (
    <>
      <input
        type="text"
        className="newInput"
        placeholder="What needs to be done?"
        onKeyDown={(event) => {
          if (event.target.value.length > 0 && event.key === "Enter") {
            dispatch({
              type: actionTypes.CREATE_TASK,
              payload: event.target.value,
            });
            event.target.value = "";
          }
        }}
        autoFocus
      />

      {filteredTodos.map((eachTodo, index) => {
        return <Todo eachTodo={eachTodo} key={index} />;
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
            onClick={() =>
              dispatch({ type: actionTypes.CHANGE_FILTER, payload: "all" })
            }
          >
            All
          </button>
          <button
            className={state.status === "active" ? "button active" : "button"}
            onClick={() =>
              dispatch({ type: actionTypes.CHANGE_FILTER, payload: "active" })
            }
          >
            Actives
          </button>
          <button
            className={
              state.status === "completed" ? "button active" : "button"
            }
            onClick={() =>
              dispatch({
                type: actionTypes.CHANGE_FILTER,
                payload: "completed",
              })
            }
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
            dispatch({
              type: actionTypes.TOGGLE_TASK_ISCOMPLETED,
              payload: eachTodo,
            })
          }
        />
        <label
          contentEditable={true}
          suppressContentEditableWarning={true}
          onBlur={(event) =>
            dispatch({
              type: actionTypes.EDIT_TASK,
              payload: {
                value: event.target.textContent,
                id: eachTodo.id,
              },
            })
          }
          onKeyDown={preventDefault}
        >
          {eachTodo.name}
        </label>
      </div>
      <button
        className="removeButton"
        onClick={() =>
          dispatch({ type: actionTypes.REMOVE_TASK, payload: eachTodo.id })
        }
      >
        <HiOutlineXMark />
      </button>
    </div>
  );
}
