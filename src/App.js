/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { createContext } from "react";
import { TodoList } from "./components/TodoList/TodoList";
import "./App.css";

export const AppContext = createContext();

export function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState(null);
  const [buttonClassName, setbuttonClassName] = useState(null);
  const contextValue = { todos, setTodos };

  // ----------------------------------------------------------------
  // Create new task
  // ----------------------------------------------------------------
  const handleAddTodo = (event) => {
    if (event.target.value.length > 0 && event.key === "Enter") {
      let myListName = event.target.value;
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          { id: uuidv4(), name: myListName, isCompleted: false },
        ];
      });
      event.target.value = "";
    }
  };

  // ----------------------------------------------------------------
  // Set the status when I click the button
  // ----------------------------------------------------------------

  const clickAll = () => {
    setStatus(null);
    setbuttonClassName("all");
  };

  const clickActive = () => {
    setStatus("active");
    setbuttonClassName("active");
  };

  const clickCompleted = () => {
    setStatus("completed");
    setbuttonClassName("completed");
  };

  // ----------------------------------------------------------------
  // Change todos by the status
  // todos.isCompleted = false => "active"
  // todos.isCompleted = true  => "completed"
  // ----------------------------------------------------------------

  const filteredTodos = todos.filter((todo) => {
    if (status === "active") {
      return !todo.isCompleted;
    } else if (status === "completed") {
      return todo.isCompleted;
    }
  });

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="toDoContainer">
        <input
          type="text"
          className="newInput"
          placeholder="What needs to be done?"
          onKeyDown={handleAddTodo}
          autoFocus
        />
        <AppContext.Provider value={contextValue}>
          <TodoList allTodos={status === null ? todos : filteredTodos} />
        </AppContext.Provider>

        <div className="footerContainer">
          <div className="itemNumber">
            {todos.filter((todo) => !todo.isCompleted).length < 2
              ? `${todos.filter((todo) => !todo.isCompleted).length} task left`
              : `${
                  todos.filter((todo) => !todo.isCompleted).length
                } tasks left `}
          </div>
          <div className="buttonContainer">
            <button
              className={buttonClassName === "all" ? "button active" : "button"}
              onClick={clickAll}
            >
              All
            </button>
            <button
              className={
                buttonClassName === "active" ? "button active" : "button"
              }
              onClick={clickActive}
            >
              Actives
            </button>
            <button
              className={
                buttonClassName === "completed" ? "button active" : "button"
              }
              onClick={clickCompleted}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
