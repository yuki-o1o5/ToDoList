/* eslint-disable array-callback-return */
import { v4 as uuidv4 } from "uuid";
import { useReducer } from "react";
import { createContext } from "react";
import { TodoList } from "./components/TodoList/TodoList";
import "./App.css";

export const AppContext = createContext({});

export const actionTypes = {
  CREATE_TASK: "CREATE_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  TOGGLE_TASK_ISCOMPLETED: "TOGGLE_TASK_ISCOMPLETED",
  EDIT_TASK: "EDIT_TASK",
  CHANGE_FILTER: "CHANGE_FILTER",
};

const initialState = {
  todos: [],
  status: "all",
};

const appStateReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.CREATE_TASK:
      let myListName = action.payload;
      const newTodo = { id: uuidv4(), name: myListName, isCompleted: false };
      return { todos: [...state.todos, newTodo] };

    // eslint-disable-next-line no-fallthrough
    case actionTypes.REMOVE_TASK:
      const updatedTodosByRemove = state.todos.filter(
        (todo) => todo.id !== action.payload
      );
      return { todos: updatedTodosByRemove };

    case actionTypes.TOGGLE_TASK_ISCOMPLETED:
      const updatedTodosByToggle = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !action.payload.isCompleted }
          : todo
      );
      return { todos: updatedTodosByToggle };

    // eslint-disable-next-line no-duplicate-case
    case actionTypes.EDIT_TASK:
      console.log(action.payload.value);
      if (action.payload.value.length < 0) {
        const updatedTodosByRemove = state.todos.filter(
          (todo) => todo.id !== action.payload.id
        );
        return { todos: updatedTodosByRemove };
      } else {
        const reEditTaskName = action.payload.value;
        const updatedTodosByReEdit = state.todos.map((todo) =>
          todo.id === action.payload.id ? { todo, name: reEditTaskName } : todo
        );
        console.log(updatedTodosByReEdit, "edit");
        return { todos: updatedTodosByReEdit };
      }

    case actionTypes.CHANGE_FILTER:
      // all, active, completed
      return { ...state, status: action.payload };

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
