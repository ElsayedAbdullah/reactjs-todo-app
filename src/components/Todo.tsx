import { CheckCircle, Edit, Trash } from "lucide-react";
import { useRef, useState } from "react";

interface IProps {
  id: string;
  text: string;
  completed: boolean;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
  updateTodo: (id: string, text: string) => void;
}

const Todo = ({
  id,
  text,
  completed,
  deleteTodo,
  toggleTodo,
  updateTodo,
}: IProps) => {
  const [isEdit, setIsEdit] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);

  // Edit Todo
  const submitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateTodo(id, inputRef.current!.value);
    setIsEdit(false);
  };

  if (isEdit) {
    return (
      <form
        onSubmit={submitEdit}
        className="d-f"
        style={{ maxWidth: "300px", margin: "10px auto" }}
      >
        <input
          ref={inputRef}
          className="input-field"
          type="text"
          defaultValue={text}
        />
        <button type="submit" className="btn">
          Update
        </button>
      </form>
    );
  }
  return (
    <div className="d-f" style={{ maxWidth: "300px", margin: "10px auto" }}>
      <p
        style={{
          textDecoration: completed ? "line-through" : "none",
          opacity: completed ? 0.5 : 1,
          flex: 1,
        }}
      >
        {text}
      </p>
      <div style={{ gap: "10px", justifyContent: "flex-end", display: "flex" }}>
        <button
          title="toggle completed"
          className="btn delete-btn"
          onClick={() => toggleTodo(id)}
        >
          <CheckCircle color="green" size={16} />
        </button>
        <button
          title="Edit"
          className="btn delete-btn"
          onClick={() => setIsEdit(true)}
        >
          <Edit color="skyblue" size={16} />
        </button>
        <button
          title="Delete"
          className="btn delete-btn"
          onClick={() => deleteTodo(id)}
        >
          <Trash color="red" size={16} />
        </button>
      </div>
    </div>
  );
};

export default Todo;
