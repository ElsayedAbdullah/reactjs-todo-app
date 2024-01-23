import { useEffect, useState } from "react";
import "./App.css";
import TodoForm, { ITodo } from "./components/TodoForm";
import Todo from "./components/Todo";
import { Trash } from "lucide-react";

function App() {
  const [todos, setTodos] = useState<ITodo[]>(
    JSON.parse(localStorage.getItem("todos")!) || []
  );
  const [status, setStatus] = useState<string>("all");
  const [filteredTodos, setFilteredTodos] = useState<ITodo[]>([]);
  const [toggleAllCompleted, setToggleAllCompleted] = useState(true);

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
    // prompt("Are you sure to delete this todo?");
    if (window.confirm("Are you sure to delete this todo?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
    return;
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
          className={`update-btn btn ${status === "all" ? "active" : ""}`}
          onClick={() => {
            setStatus("all");
          }}
        >
          All
        </button>
        <button
          className={`update-btn btn ${
            status === "uncompleted" ? "active" : ""
          }`}
          onClick={() => setStatus("uncompleted")}
        >
          uncompleted
        </button>
        <button
          className={`update-btn btn ${status === "completed" ? "active" : ""}`}
          onClick={() => setStatus("completed")}
        >
          Completed
        </button>
      </div>

      <div style={{ gap: "10px", flexDirection: "column", display: "flex" }}>
        {todos.some((todo) => todo.completed === true) ? (
          <button
            className="all-btn btn"
            onClick={() => setTodos(todos.filter((todo) => !todo.completed))}
          >
            Clear Completed Todos
          </button>
        ) : null}
        <button
          className="all-btn btn"
          onClick={() => {
            setTodos(
              todos.map((todo) => {
                return {
                  ...todo,
                  completed: toggleAllCompleted,
                };
              })
            );
            setToggleAllCompleted(!toggleAllCompleted);
          }}
        >
          Toggle All Completed: {`${toggleAllCompleted}`}
        </button>
        {todos.length ? (
          <button
            className="btn all-btn"
            style={{
              display: "flex",
              gap: "5px",
              alignItems: "center",
              justifyContent: "center",
              color: "red",
              fontSize: "14px",
            }}
          >
            <span>clear all todos</span> <Trash size={16} />
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default App;
