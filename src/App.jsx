import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from "./ToDoList"
import {toast, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [task, updateTask] = useState("");
  const [items, setItems] = useState([]);
  const year = new Date().getFullYear();

  function handleChange(event){
    const newTask = event.target.value;
    updateTask(newTask);
    console.log(task);
  }

  function handleClick(event){
    if (task.trim() !== '') {
      setItems(prevItems =>{
        return [...prevItems, task]
      });
      updateTask("");
      event.preventDefault();
      notify("Task is added successfully");
    }
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (task.trim() !== '') {
        setItems(prevItems =>{
          return [...prevItems, task]
        });
        updateTask("");
        event.preventDefault();
        notify("Task is added successfully");
      }
    }
  };

  function deleteItem(id) {
    setItems(prevValue => {
      return prevValue.filter((item, index) => {
        return index !== id;
      });
    });
    notify("Task is deleted successfully");
  }

  const notify = (message) =>{
    toast.success(message, {
      position: "bottom-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  }

  return (
    <>
      <div className="container">
        
        <div id="newtask">
          <div style={{textAlign:'center', marginBottom:'10px', fontSize:"30px"}}>My To-Do-List</div>
          <input type="text" placeholder="Task to be done.." onChange={handleChange} onKeyDown={handleKeyDown} value={task}/>
          <button onClick ={handleClick}>Add It</button>
        </div>
        <div id="tasks">
          <ul>
          {items.map((toDoItem,index) => <ToDoList key={index} id={index} text={toDoItem} onChecked={deleteItem}/>)}
          </ul>
          <p className="footer black">Write Task and Click 'Add it" or Press Enter</p>
          <p className="footer black">Click on the Completed work to Delete</p>
          <p className="footer">Made by Arnab, Copyright ©{year} Arnab Pal. All Rights Reserved.</p>
        </div>

        <ToastContainer
          position="bottom-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />

      </div>
    </>
  )
}

export default App;
