import { useEffect, useState } from "react";
import "./App.css";
import TodoForm, { ITodo } from "./components/TodoForm";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState<ITodo[]>(
    JSON.parse(localStorage.getItem("todos")!) || []
  );
  const [status, setStatus] = useState<string>("all");
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);

  useEffect(() => {
    filterHandler();
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, status]);

  useEffect(() => {
    if (localStorage.getItem("todos") === null) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      const localTodos = localStorage.getItem("todos");
      setTodos(JSON.parse(localTodos!));
    }
  }, []);

  // filter todos
  const filterHandler = () => {
    switch (status) {
      case "completed":
        setFilteredTodos(todos.filter((todo) => todo.completed));
        break;
      case "uncompleted":
        setFilteredTodos(todos.filter((todo) => !todo.completed));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  // adding todo to the list
  function addTodo(todo: ITodo) {
    setTodos([todo, ...todos]);
  }

  // deleting todo from the list
  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  // toggle todo
  function toggleTodo(id: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }

  return (
    <div className="container">
      <TodoForm addTodo={addTodo} />
      <div className="todos-list">
        {filteredTodos.length ? (
          filteredTodos?.map((todo) => (
            <Todo
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              {...todo}
              key={todo.id}
            />
          ))
        ) : (
          <p style={{ textAlign: "center", opacity: "0.5" }}>No todos left</p>
        )}
      </div>

      <div>
        <button
          className="update-btn btn"
          onClick={() => {
            setStatus("all");
          }}
        >
          All
        </button>
        <button
          className="update-btn btn"
          onClick={() => setStatus("uncompleted")}
        >
          uncompleted
        </button>
        <button
          className="update-btn btn"
          onClick={() => setStatus("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
}

export default App;
