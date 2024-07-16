import { useState, useEffect } from 'react';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(todoString);
      setTodos(todos);
    }
  }, []);

  const saveToLS = (updatedTodos) => {
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };

  const toggleFinished = (e) => {
    setShowFinished(!showFinished);
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleEdit = (e, id) => {
    let t = todos.find(i => i.id === id);
    setTodo(t.todo);
    let newTodos = todos.filter(item => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleAdd = (e) => {
    const updatedTodos = [...todos, { id: uuidv4(), todo, isCompleted: false }];
    setTodos(updatedTodos);
    setTodo("");
    saveToLS(updatedTodos);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (id) => {
    const newTodos = todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
    saveToLS(newTodos);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  return (
    <>
      <div className="container bg-slate-300 lg:w-[35%] md:w-[60%] min-h-[93vh] mx-auto sm:my-5 p-5 rounded-xl">
        <div className="font-bold text-[20px] text-center">My-Task - Manage your todos at one Place</div>
        <div className='font-bold text-[17px] m-3'>Add a Todo</div>
        <div className='flex justify-between'>
          <input onChange={handleChange} onKeyDown={handleKeyDown} value={todo} type="text" placeholder='Write your Todo here' className="rounded-full w-[80%] py-1 px-5 outline-none " />
          <button onClick={handleAdd} disabled={todo.length < 1} className='rounded-full bg-purple-600 w-16 disabled:bg-purple-500 cursor-pointer'>Save</button>
        </div>
        <input className='mr-2 my-6 cursor-pointer' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} />
        <label className='my-6'>Show Finished </label>
        <div className='h-[1px] w-[85%] mx-auto bg-gray-400 my-2'></div>
        <div className="todos mt-6">
          <div className='text-[16px] font-bold my-4'>Your Todos :</div>
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className='flex'>
             <div className='mt-1'><input className='mx-4 cursor-pointer' name={item.id} onChange={() => handleCheckbox(item.id)} type="checkbox" checked={item.isCompleted} id='' /></div>
              <div className={`w-[250px] break-words text-purple-900 ${item.isCompleted ? "line-through" : ""}`}>
                {item.todo}
              </div>
              <div className='mt-1'><button onClick={(e) => { handleEdit(e, item.id) }} className='mx-2 text-[20px]'><FaEdit /></button></div>
              <div className='mt-1'><button onClick={(e) => { handleDelete(e, item.id) }} className='mx-2 text-[21px]'><MdDelete /></button></div>
            </div>
          })}
        </div>
      </div>
      <div className='text-gray-600 text-[13px] text-center my-6'>Copyright © Made by Jatin Baroliya. All rights reserved.</div>
    </>
  );
}

export default App;
