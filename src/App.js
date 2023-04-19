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
      const newTodo = {
        id: uuidv4(),
        name: action.payload,
        isCompleted: false,
      };

      const myCurrentTasksBeforeCreate = localStorage.getItem("tasks");
      const myUpdatedTasksBeforeCreate = myCurrentTasksBeforeCreate
        ? JSON.parse(myCurrentTasksBeforeCreate)
        : [];
      localStorage.setItem(
        "tasks",
        JSON.stringify([...myUpdatedTasksBeforeCreate, newTodo])
      );
      // console.log(JSON.parse(localStorage.getItem("tasks")));
      const myTodosByCreate = JSON.parse(localStorage.getItem("tasks"));

      return { todos: myTodosByCreate };

    // eslint-disable-next-line no-fallthrough
    case actionTypes.REMOVE_TASK:
      const myCurrentTasksBeforeRemove = localStorage.getItem("tasks");
      const myUpdatedTasksBeforeRemove = JSON.parse(myCurrentTasksBeforeRemove);
      const myTasksByRemove = myUpdatedTasksBeforeRemove.filter(
        (todo) => todo.id !== action.payload
      );
      localStorage.setItem("tasks", JSON.stringify(myTasksByRemove));
      const myTodosByRemove = JSON.parse(localStorage.getItem("tasks"));

      // console.log(updatedTodosByRemove)
      return { todos: myTodosByRemove };

    case actionTypes.TOGGLE_TASK_ISCOMPLETED:
      const myCurrentTasksBeforeToggle = localStorage.getItem("tasks");
      const myUpdatedTasksBeforeToggle = JSON.parse(myCurrentTasksBeforeToggle);
      const myTasksByToggle = myUpdatedTasksBeforeToggle.map((todo) =>
        todo.id === action.payload.id
          ? { ...todo, isCompleted: !action.payload.isCompleted }
          : todo
      );
      localStorage.setItem("tasks", JSON.stringify(myTasksByToggle));
      const myTodosByToggle = JSON.parse(localStorage.getItem("tasks"));
      return { todos: myTodosByToggle };

    // eslint-disable-next-line no-duplicate-case
    case actionTypes.EDIT_TASK:
      const myCurrentTasksBeforeEdit = localStorage.getItem("tasks");
      const myUpdatedTasksBeforeEdit = JSON.parse(myCurrentTasksBeforeEdit);
      if (action.payload.value.length === 0) {
        const myTasksByRemove = myUpdatedTasksBeforeEdit.filter(
          (todo) => todo.id !== action.payload.id
        );
        localStorage.setItem("tasks", JSON.stringify(myTasksByRemove));
        const myTodosByEditRemove = JSON.parse(localStorage.getItem("tasks"));
        return { todos: myTodosByEditRemove };
      } else {
        const reEditTaskName = action.payload.value;
        const myTasksByEdit = myUpdatedTasksBeforeEdit.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, name: reEditTaskName }
            : todo
        );
        localStorage.setItem("tasks", JSON.stringify(myTasksByEdit));
        const myTodosByEdit = JSON.parse(localStorage.getItem("tasks"));

        return { todos: myTodosByEdit };
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
