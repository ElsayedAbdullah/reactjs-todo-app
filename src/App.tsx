import { useEffect, useState } from "react";
import "./App.css";
import TodoForm, { ITodo } from "./components/TodoForm";
import Todo from "./components/Todo";
import { Trash } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

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
    const notify = () => toast.success("Todo added successfully!");
    notify();
  }

  // deleting todo from the list
  function deleteTodo(id: string) {
    // prompt("Are you sure to delete this todo?");
    if (window.confirm("Are you sure to delete this todo?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
      const notify = () => toast.success("Todo deleted successfully!");
      notify();
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

  // update todo
  function updateTodo(id: string, text: string) {
    setTodos(
      todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, text };
        }
        return todo;
      })
    );
  }

  return (
    <div className="container">
      <h1 style={{ textAlign: "center", marginBottom: "30px", opacity: "0.7" }}>
        Todo App
      </h1>
      <TodoForm addTodo={addTodo} />
      <div className="todos-list">
        {filteredTodos.length ? (
          filteredTodos?.map((todo) => (
            <Todo
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              updateTodo={updateTodo}
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
        {todos.length ? (
          <>
            {todos.some((todo) => todo.completed === true) ? (
              <button
                className="all-btn btn"
                onClick={() =>
                  setTodos(todos.filter((todo) => !todo.completed))
                }
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
            <button
              onClick={() => setTodos([])}
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
          </>
        ) : null}
      </div>
      <Toaster />
    </div>
  );
}

export default App;
