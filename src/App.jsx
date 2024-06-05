import Navbar from './components/Navbar';
import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setShowFinished] = useState(true)
  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if (todoString) {

      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  }, [])


  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
    setTodo("")
    saveToLs();
  }

  const togglefinished = (e) => {
    setShowFinished(!showFinished)
  }


  const saveToLs = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLs();
  };

  const handleDelete = (e, id) => {

    let newTodos = todos.filter(item => {
      return item.id !== id
    });
    setTodos(newTodos)
    saveToLs();
  };

  const handleChange = (e) => {
    setTodo(e.target.value)
  };
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item => {
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
    saveToLs();
  };

  return (
    <>
      <Navbar />
      <div className=" mx-3 md:container max-w-screen-md md:mx-auto my-5 rounded-xl bg-violet-100 p-5 min-h-[80vh] md:w-1/2">
        <h1 className='font-bold text-center md:text-xl'>Plan Your Work In Todos</h1>
        <div className="addTodo my-3 flex flex-col gap-4">
          <h2 className='text-lg font-bold md:mx-2'>Add a Todo</h2>
          <input type="text" className='w-full py-1 px-2 rounded-lg' onChange={handleChange} value={todo} />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 disabled:bg-violet-700 text-sm text-white rounded-md  font-bold'>Add</button>
        </div>
        <input onChange={togglefinished} type="checkbox" checked={showFinished} name="" id="" /> Show Finished
        <h2 className='text-lg font-bold my-3 md:mx-2'>Your Todos</h2>
        <div className="todos">
          {todos.map(item => {
            return (showFinished || !item.isCompleted) && <div key={item.id} className="todo flex justify-between md:w-1/2   my-2">
              <div className='flex gap-5'>
                <input onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} name={item.id} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="btn flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm text-white rounded-md mx-1 font-bold'><FaEdit />
                </button>
                <button onClick={(e) => { handleDelete(e, item.id) }} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm text-white rounded-md mx-1 font-bold'><MdDelete /></button>
              </div>

            </div>
          })}
        </div>

      </div>
    </>
  )
}

export default App