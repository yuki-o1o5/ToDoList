import { v4 as uuidv4 } from "uuid";
import { useState, useRef } from "react";
import TodoList from "./components/TodoList/TodoList";
import "./App.css";

function App() {
  const [todos, setTodos] = useState([]);

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

  return (
    <div className="App">
      <h1>todos</h1>
      <div className="toDoContainer">
        <input
          type="text"
          className="newInput"
          placeholder="What needs to be done?"
          onKeyPress={handleAddTodo}
          ref={todoNameRef}
        />
        <TodoList todos={todos} watchingCheckBox={watchingCheckBox} />

        <div className="linkBarContainer">
          <div className="itemNumber">
            {todos.filter((todo) => !todo.isCompleted).length} tasks
          </div>
          <div className="linkContainer">
            <button className="linkButton">All</button>
            <button className="linkButton">Actives</button>
            <button className="linkButton">Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
