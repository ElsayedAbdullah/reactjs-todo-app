import { CheckCircle, Trash } from "lucide-react";

interface IProps {
  id: string;
  text: string;
  completed: boolean;
  deleteTodo: (id: string) => void;
  toggleTodo: (id: string) => void;
}

const Todo = ({ id, text, completed, deleteTodo, toggleTodo }: IProps) => {
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
        <button className="btn delete-btn" onClick={() => toggleTodo(id)}>
          <CheckCircle color="green" size={16} />
        </button>
        <button className="btn delete-btn" onClick={() => deleteTodo(id)}>
          <Trash color="red" size={16} />
        </button>
      </div>
    </div>
  );
};

export default Todo;
