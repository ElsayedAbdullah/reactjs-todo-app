interface IProps {
  id: string;
  text: string;
  completed: boolean;
  deleteTodo: (id: string) => void;
}

const Todo = ({ id, text, completed, deleteTodo }: IProps) => {
  return (
    <div className="d-f">
      <p style={{ textDecoration: completed ? "line-through" : "none" }}>
        {text}
      </p>
      <button className="btn delete-btn" onClick={() => deleteTodo(id)}>
        &times;
      </button>
    </div>
  );
};

export default Todo;
