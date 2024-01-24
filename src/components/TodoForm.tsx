import { useRef, useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface ITodo {
  id: string;
  text: string;
  completed: boolean;
}

interface IProps {
  addTodo: (todo: ITodo) => void;
}

const TodoForm = ({ addTodo }: IProps) => {
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // handle submit function
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // prevent page refresh
    e.preventDefault();

    // validate input
    if (!input) {
      return;
    }

    // add todo
    addTodo({
      id: uuidv4(),
      text: input,
      completed: false,
    });

    // clear input
    setInput("");

    // focus on input
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px" }}>
      <input
        type="text"
        className="input-field"
        placeholder="Add Todo"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        ref={inputRef}
        autoFocus
        style={{ flex: 1 }}
      />
      <button className="btn" type="submit">
        Add Todo
      </button>
    </form>
  );
};

export default TodoForm;
