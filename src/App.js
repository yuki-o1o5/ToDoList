/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from "uuid";
import { useState, useReducer } from "react";
import { createContext } from "react";
import { TodoList } from "./components/TodoList/TodoList";
import "./App.css";

export const AppContext = createContext({});

const initialState = {
  todos: [],
  status: "",
};

const appStateReducer = (state, action) => {
  switch (action.type) {
    case "CREATE_TASK":
      if (
        action.content.target.value.length > 0 &&
        action.content.key === "Enter"
      ) {
        let myListName = action.content.target.value;
        const newTodo = { id: uuidv4(), name: myListName, isCompleted: false };
        action.content.target.value = "";
        return { todos: [...state.todos, newTodo] };
      }

    case "REMOVE_TASK":
      const updatedTodosByRemove = state.todos.filter(
        (todo) => todo.id !== action.content
      );
      return { todos: updatedTodosByRemove };

    case "HANDLE_CHECKBOX":
      const updatedTodosByToggle = state.todos.map((todo) =>
        todo.id === action.content.id
          ? { ...todo, isCompleted: !action.content.isCompleted }
          : todo
      );
      return { todos: updatedTodosByToggle };

    case "REEDIT_TASK":
      if (action.content.target.textContent.length === 0) {
        const updatedTodosByRemove = state.todos.filter(
          (todo) => todo.id !== action.content2
        );
        return { todos: updatedTodosByRemove };
      } else {
        const reEditTaskName = action.content.target.textContent;
        const updatedTodosByReEdit = state.todos.map((todo) =>
          todo.id === action.content ? { todo, name: reEditTaskName } : todo
        );
        return { todos: updatedTodosByReEdit };
      }

    default:
      return state;
  }
};

const AppContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appStateReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export function App() {
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState(null);
  const [buttonClassName, setbuttonClassName] = useState(null);
  const contextValue = { todos, setTodos };

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

  // const filteredTodos = todos.filter((todo) => {
  //   if (status === "active") {
  //     return !todo.isCompleted;
  //   } else if (status === "completed") {
  //     return todo.isCompleted;
  //   }
  // });

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="toDoContainer">
        <AppContextProvider value={contextValue}>
          <TodoList />
        </AppContextProvider>

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

// export const useAppContext = () => {
//   const context = useContext(AppContext);
//   if (context === null) {
//     throw new Error("useOrdersState must be used within a OrdersStateProvider");
//   }
//   return context;
// };
