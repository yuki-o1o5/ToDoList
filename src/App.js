/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from "uuid";
import { useReducer } from "react";
import { createContext } from "react";
import { TodoList } from "./components/TodoList/TodoList";
import "./App.css";

export const AppContext = createContext({});

const initialState = {
  todos: [],
  status: "all",
  buttonClassName: "all",
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

    // eslint-disable-next-line no-fallthrough
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

    case "ClICK_ALL":
      return { ...state, status: "all" };

    case "ClICK_ACTIVE":
      return { ...state, status: "active" };

    case "ClICK_COMPLETED":
      return { ...state, status: "completed" };

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
  return (
    <div className="App">
      <h1>todos</h1>
      <div className="toDoContainer">
        <AppContextProvider>
          <TodoList />
        </AppContextProvider>
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
