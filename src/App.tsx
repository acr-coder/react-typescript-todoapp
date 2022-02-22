import React, {FC, useState, ChangeEvent } from 'react';
import './App.css';
import TodoTask from './Components/TodoTask';
import {ITask} from './Interfaces'

const App: FC = () => {
  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [todolist, setTodolist] = useState<ITask[]>([]);
  const [error,setError] = useState<string>("")

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task"){
      setTask(event.target.value)
      setError("")
    }else{
      setDeadline(Number(event.target.value))
    }      
  };

  const addTask = (): void => {
    if(task.trim().length < 5){
      setError("The task must be at least 5 charecters")
    }else{
      const newTask ={taskName: task, deadline:deadline}
    setTodolist([...todolist, newTask]);
    setTask("");
    setDeadline(0);
    setError("")
    }    
  }

  const completeTask = (taskNameToDelete: string): void => {
    setTodolist(todolist.filter((task) => {
      return task.taskName !== taskNameToDelete
    }))
  }
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
        <input type="text"  placeholder='Task...' name='task' value={task} onChange={handleChange} />
        {error ? <div style={{height:"30px", color:"white", fontSize:"10px"}} >{error}</div> : <div style={{height:"30px"}} ></div>}
        <input type="number"  placeholder="Deadline..." name='deadline' value={deadline} onChange={handleChange} />
        </div>
        <button onClick={addTask} >Add Task</button>
      </div>
      <div className="todoList">
        {todolist.map((task: ITask, key:number) => {
          return <TodoTask key={key} task={task} completeTask={completeTask} />
        })}
      </div>
    </div>
  );
}

export default App;
