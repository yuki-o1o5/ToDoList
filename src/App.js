import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { createContext } from "react";
import { TodoList } from "./components/TodoList/TodoList";
import "./App.css";

export const AppContext = createContext();

export function App() {
  const [todos, setTodos] = useState([]);

  const contextValue = { todos, setTodos };

  const handleAddTodo = (event) => {
    if (event.target.value.length > 0 && event.key === "Enter") {
      let myListName = event.target.value;
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          { id: uuidv4(), name: myListName, isCompleted: false, status: "all" },
        ];
      });
      event.target.value = "";
      console.log(todos);
    }
  };

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
          <TodoList allTodos={todos} />
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
            // className={activeId === "all" ? "button active" : "button"}
            // onClick={clickAll}
            >
              All
            </button>
            <button
            // className={activeId === "active" ? "button active" : "button"}
            // onClick={clickActivities}
            >
              Actives
            </button>
            <button
            // className={activeId === "completed" ? "button active" : "button"}
            // onClick={clickCompleted}
            >
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// const [filterType, setFilterType] = useState("all");

// const [activeId, setActiveId] = useState(null);

// let filteredTodos = todos;
// if (filterType === "active") {
//   filteredTodos = todos.filter((todo) => !todo.isCompleted);
// } else if (filterType === "completed") {
//   filteredTodos = todos.filter((todo) => todo.isCompleted);
// }

// const clickAll = () => {
//   setFilterType("all");
//   setActiveId("all");
// };

// const clickActivities = () => {
//   setFilterType("active");
//   setActiveId("active");
// };

// const clickCompleted = () => {
//   setFilterType("completed");
//   setActiveId("completed");
// };
