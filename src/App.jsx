import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToDoList from "./ToDoList"

function App() {
  const [task, updateTask] = useState("");
  const [items, setItems] = useState([]);
  const year = new Date().getFullYear();

  function handleChange(event){
    const newTask = event.target.value;
    updateTask(() => newTask);
    console.log(task);
  }

  function handleClick(event){
    if (task.trim() !== '') {
      setItems(prevItems =>{
        return [...prevItems, task]
      });
      updateTask("");
    }
    event.preventDefault();
  }

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (task.trim() !== '') {
        setItems(prevItems =>{
          return [...prevItems, task]
        });
        updateTask("");
      }
    }
  };

  function deleteItem(id) {
    setItems(prevValue => {
      return prevValue.filter((item, index) => {
        return index !== id;
      });
    });
  }

  return (
    <>
      <div className="container">
        
        <div id="newtask">
          <div style={{textAlign:'center', marginBottom:'10px'}}>My To-Do-List</div>
          <input type="text" placeholder="Task to be done.." onChange={handleChange} onKeyDown={handleKeyDown}/>
          <button onClick ={handleClick}>Add It</button>
        </div>
        <div id="tasks">
          <ul>
          {items.map((toDoItem,index) => <ToDoList key={index} id={index} text={toDoItem} onChecked={deleteItem}/>)}
          </ul>
          <p className="footer black">Click on the Completed work to Delete</p>
          <p className="footer">Made by Arnab, Copyright ©{year} Arnab Pal. All Rights Reserved.</p>
        </div>
        
      </div>
    </>
  )
}

export default App;
