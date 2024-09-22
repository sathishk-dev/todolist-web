import React, { useEffect, useRef, useState } from 'react'
import Todos from '../components/Todos'

export default function Home() {
  const newTask = useRef(null);
  const [taskList, setTaskList] = useState(localStorage.getItem('todos') ? JSON.parse(localStorage.getItem("todos")) : [])
  const [editIndex, setEditIndex] = useState(null); //store the edit ID
  const [editedTodo, setEditedTodo] = useState(""); //store the updated task name

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(taskList));
  }, [taskList]);

  const addTask = (e) => {
    e.preventDefault();
    const inputText = newTask.current.value.trim(); //store value to prevent loss
    if (inputText == "") {
      return null
    }
    else {
      setTaskList((prev) => {
        let newAddedTask = {
          id: Date.now(), //date is used to generate id dynamic
          taskName: inputText,
          isComplete: false
        }
        return [...prev, newAddedTask]
      })
    }
    newTask.current.value = "";
    document.querySelector('.ok-btn').innerHTML = "Add Task"
  }

  // task Complete handle
  const completeHandle = (id) => {
    setTaskList((prev) => {
      return prev.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      })
    })
  }

  //task delete
  const deleteTask = (id) => {
    setTaskList((prev) => {
      return prev.filter((task) => task.id !== id)
    })
  }

  //task update/edit
  const taskUpdate = (id) => {
    setEditIndex(id)
    setEditedTodo(taskList.find((todo) => todo.id == id).taskName)
  }
  const changeTask = (id) => {
    taskList.find((todo) => todo.id == id).taskName = editedTodo;
    setEditIndex(null);
  }

  return (
    <div>
      <div className=' mx-auto py-5 bg-blue-400 '>
        <h2 className='text-center text-[30px] text-white font-semibold'>TodoList</h2>
        <p className='text-center text-white'>Stay Organized, Achieve More!</p>
      </div>
      <div className=' mx-auto h-auto p-4 md:px-6 pt-7 mb-5 flex justify-center'>
        <div className='w-full lg:px-[100px]'>

          <form className='flex mb-5'>
            <input ref={newTask} type="text" className='py-3 px-4 flex-1 rounded-tl rounded-bl text-sm focus:outline-none' placeholder="Add Your Task" />
            <button type='submit' onClick={addTask} className='bg-blue-400 ok-btn px-4 py-3 text-sm font-semibold text-white rounded-tr rounded-br'>Add Task</button>
          </form>

          {/* Task  */}
          {
            taskList.length == 0 ? (
              <p className='text-sm text-gray-500'>No task found</p>
            ) : (
              taskList.map((task, index) => {
                return <Todos task={task} key={index} toggleComplete={completeHandle} delTask={deleteTask} taskUpdate={taskUpdate} editIndex={editIndex} changeTask={changeTask} editTodo={editedTodo} setEditedTodo={setEditedTodo} />
              })
            )
          }
          <br />
        </div>
      </div>

      
    </div>
  )
}
