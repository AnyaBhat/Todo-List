import './App.css';
import React,{useEffect, useState} from 'react';

function App() {       
  const[todos,setTodos]=useState(()=>{       //array of all todos
    return JSON.parse(localStorage.getItem('todos')) || []         //get input from localStorage but if empty return []
  }) 
  const[todo,setTodo]=useState('')            // current todo
  const[todoEditing,setTodoEditing]=useState(null)  //todo id being editted               
  const [editingText,setEditingText]=useState('')  //current edited text 

  useEffect(()=>{                  // any changes in todos array will be saved in local storage
    localStorage.setItem("todos",JSON.stringify(todos))   //stringify converts json to a string 
  },[todos])
  
  function handleSubmit(e){                 //on add todo 
    e.preventDefault() 
    const newTodo={
      id:new Date().getTime(), 
      text:todo,
      complete:false
    }
    setTodos([...todos].concat(newTodo))    //concatenating new todo to the todos array
    setTodo("")       
  } 

  function deleteTodo(id){
    const updatedtodo=[...todos].filter((todo)=>todo.id!== id)     //all todo not equal to id will be listed 
    setTodos(updatedtodo)
  }

  function toggleComplete(id){          //task completed or not 
    const updatedtodos=[...todos].map((task)=>{
      if(task.id===id){
        task.complete = !task.complete               
      }
      return task
    })
    setTodos(updatedtodos)
  }

  function editTodo(id){
    const updatedtodos=[...todos].map((task)=>{
      if(task.id===id){
        task.text = editingText              //updating the text 
      }
      return task
    })
    setTodos(updatedtodos)
    setTodoEditing(null)          //currently editing todo-id is set to null
    setEditingText('')            
  }

  return (
    <div className="App">

      <h1>Todo List</h1>

      <form onSubmit={handleSubmit}>

        <input type="text" 
        onChange={(e)=>setTodo(e.target.value)}
        value={todo}/>

        <button type='submit'>Add</button>

      </form>

      {todos.map((task)=><div key={task.id}>
          <input type="checkbox"  className="tasks" 
          onChange={()=>toggleComplete(task.id)} 
          checked={task.complete}/>
          {todoEditing===task.id ? 
          (<input className="tasks" type="text" 
          onChange={(e)=> setEditingText(e.target.value)} 
          value={(editingText)}/>)
          :
          (<span className='tasks'>{task.text}</span>)}
          
          {todoEditing=== task.id ?
          (<button onClick={()=>editTodo(task.id)}>Submit Edit</button>)
          :
          (<button onClick={()=>setTodoEditing(task.id)}>Edit</button>)}

          <button onClick={()=> deleteTodo(task.id)}>Delete</button>

        </div>
        )}
    </div>
  );
}

export default App;
