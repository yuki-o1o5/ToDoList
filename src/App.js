import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";
import { TodoList } from "./components/TodoList/TodoList";
import FilteredTodosContext from "./constants/filteredTodosContextApi";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

  const [filterType, setFilterType] = useState("all");

  const todoNameRef = useRef();

  const handleAddTodo = (event) => {
    if (todoNameRef.current.value.length > 0 && event.key === "Enter") {
      const myListName = todoNameRef.current.value;
      setTodos((prevTodos) => {
        return [
          ...prevTodos,
          { id: uuidv4(), name: myListName, isCompleted: false },
        ];
      });
      todoNameRef.current.value = null;
    }
  };

  const watchingCheckBox = (id) => {
    const newTodos = [...todos];
    const newTodo = newTodos.find((newTodo) => newTodo.id === id);
    newTodo.isCompleted = !newTodo.isCompleted;
    setTodos(newTodos);
  };

  const handleRemoveTodo = (id) => {
    const secondNewTodos = [...todos];
    // [{ id:1234, name:"eat dinner", isCompleted:true},{},{}]
    const secondNewTodo = secondNewTodos.find(
      (secondNewTodo) => secondNewTodo.id === id
    );
    const indexOfRemove = secondNewTodos.indexOf(secondNewTodo);
    // If to-do item is found, remove the element from the array.
    if (indexOfRemove !== -1) {
      secondNewTodos.splice(indexOfRemove, 1);
      setTodos(secondNewTodos);
    }
  };

  const reEditTodoName = (id, name) => {
    const thirdNewTodos = [...todos];
    const thirdNewTodo = thirdNewTodos.find(
      (thirdNewTodo) => thirdNewTodo.id === id
    );
    thirdNewTodo.name = name;
    setTodos(thirdNewTodos);
  };

  let filteredTodos = todos;
  if (filterType === "active") {
    filteredTodos = todos.filter((todo) => !todo.isCompleted);
  } else if (filterType === "completed") {
    filteredTodos = todos.filter((todo) => todo.isCompleted);
  }

  const clickAll = () => {
    setFilterType("all");
  };

  const clickActivities = () => {
    setFilterType("active");
  };

  const clickCompleted = () => {
    setFilterType("completed");
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
          ref={todoNameRef}
          autoFocus
        />
        <FilteredTodosContext.Provider
          value={{
            filteredTodos,
            watchingCheckBox,
            handleRemoveTodo,
            reEditTodoName,
          }}
        >
          <TodoList />
        </FilteredTodosContext.Provider>

        <div className="footerContainer">
          <div className="itemNumber">
            {todos.filter((todo) => !todo.isCompleted).length < 2
              ? `${todos.filter((todo) => !todo.isCompleted).length} task left`
              : `${
                  todos.filter((todo) => !todo.isCompleted).length
                } tasks left `}
          </div>
          <div className="buttonContainer">
            <button className="button" onClick={clickAll}>
              All
            </button>
            <button className="button" onClick={clickActivities}>
              Actives
            </button>
            <button className="button" onClick={clickCompleted}>
              Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
