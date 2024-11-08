import { useEffect, useState } from 'react';
import { FaCheck, FaTasks, FaTrash } from 'react-icons/fa';
import { FaDocker, FaTag, FaTicket } from 'react-icons/fa6';

import axios from 'axios';
import Swal from 'sweetalert2';

const Todo = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/todoos').then((res) => {
      setTodos(res.data);
    });
  }, []);

  const addTodo = () => {
    const title = document.getElementById('todo-input').value;
    axios
      .post('http://localhost:5000/api/todoos', { title, completed: false })
      .then((res) => {
        setTodos([...todos, { id: res.data.id, title, completed: false }]);
        document.getElementById('todo-input').value = '';
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your todo has been saved',
          showConfirmButton: false,
          timer: 1500,
        });
      });
  };
  const deleteTodo = (id) => {
    //confirm using sweetalert
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this todo!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/api/todoos/${id}`).then((res) => {
          setTodos(todos.filter((t) => t.id !== id));
        });
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your todo has been deleted',
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
    //delete todo
  };
  const completeTodo = (id) => {
    axios
      .put(`http://localhost:5000/api/todoos/${id}`, { completed: true })
      .then((res) => {
        setTodos(
          todos.map((t) => {
            if (t.id === id) {
              return { ...t, completed: true };
            }
            return t;
          }),
        );
      });
  };

  return (
    <div className='todo'>
      <div>
        <input type='text' id='todo-input' style={{ height: '37px' }} />
        <button
          onClick={() => {
            addTodo();
          }}
        >
          Add
        </button>
      </div>
      <h3 style={{ display: todos.length > 0 ? 'none' : 'block' }}>No data</h3>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`todo-li ${todo.completed ? 'completed' : ''}`}
          >
            {todo.title}
            {todo.completed ? (
              <FaCheck />
            ) : (
              <a
                href='#'
                onClick={(e) => {
                  e.preventDefault();
                  completeTodo(todo.id);
                }}
                title='Make Complete'
              >
                <FaTasks style={{ marginInline: '1rem' }} />
              </a>
            )}
            <a
              href='#'
              onClick={(e) => {
                e.preventDefault();
                deleteTodo(todo.id);
              }}
              title='Delete'
            >
              <FaTrash style={{ marginInline: '1rem', color: 'red' }} />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
