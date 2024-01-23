import { useState } from "react";
import "./App.css";
import TodoForm, { ITodo } from "./components/TodoForm";
import Todo from "./components/Todo";

function App() {
  const [todos, setTodos] = useState<ITodo[]>([]);

  // adding todo to the list
  function addTodo(todo: ITodo) {
    setTodos([todo, ...todos]);
  }

  // deleting todo from the list
  function deleteTodo(id: string) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  return (
    <div className="container">
      <TodoForm addTodo={addTodo} />
      {todos?.map((todo) => (
        <Todo deleteTodo={deleteTodo} {...todo} key={todo.id} />
      ))}
    </div>
  );
}

export default App;
