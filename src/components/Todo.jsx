import { FaCheck } from "react-icons/fa";
const Todo = () => {
  return (
    <div className="todo">
      Todos List
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title}{" "}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                console.log(todo.title);
              }}
            >
              <FaCheck />
            </a>{" "}
          </li>
        ))}
      </ul>
    </div>
  );
};

const todos = [
  {
    id: 1,
    title: "Learn React",
    completed: false,
  },
  {
    id: 2,
    title: "Learn Vue",
    completed: false,
  },
  {
    id: 3,
    title: "Learn Angular",
    completed: false,
  },
];

export default Todo;
