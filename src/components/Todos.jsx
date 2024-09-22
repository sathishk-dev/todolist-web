import React, { useRef, useEffect } from 'react';

export default function Todos({ task, toggleComplete, delTask, taskUpdate, editIndex, changeTask, editTodo, setEditedTodo }) {
    const inputFocus = useRef(null);

    // Focus input when edit mode is activated
    useEffect(() => {
        if (editIndex === task.id && inputFocus.current) {
            inputFocus.current.focus();
        }
    }, [editIndex, task.id]);

    return (
        <div>
            <div className='flex justify-between my-2 gap-2 bg-white rounded p-1'>
                {editIndex == task.id ? (
                    <input
                        ref={inputFocus}
                        type='text'
                        id='edit-field'
                        value={editTodo}
                        onChange={(e) => setEditedTodo(e.target.value)}
                        className='py-2 px-4 flex-1 focus:outline-none'
                    />
                ) : (
                    <label
                        onClick={() => toggleComplete(task.id)}
                        className={`px-4 py-2 flex-1 cursor-pointer break-all ${task.isComplete ? 'line-through text-gray-500' : ''}`}
                    >
                        {task.taskName}
                    </label>
                )}

                <div className='flex gap-4 items-center px-4'>
                    {editIndex == task.id ? (
                        <i
                            className='fa fa-check-square-o cursor-pointer bg-green-400 p-2 flex justify-center items-center text-white rounded-full w-8 h-8'
                            onClick={() => changeTask(task.id)}
                            aria-hidden='true'
                        ></i>
                    ) : (
                        <i
                            className='fa fa-pencil-square cursor-pointer bg-blue-400 p-2 flex justify-center items-center text-white rounded-full w-8 h-8'
                            onClick={() => taskUpdate(task.id)}
                            aria-hidden='true'
                        ></i>
                    )}

                    <i
                        className='fa fa-trash cursor-pointer bg-red-400 p-2 flex justify-center items-center text-white rounded-full w-8 h-8'
                        onClick={() => delTask(task.id)}
                        aria-hidden='true'
                    ></i>
                </div>
            </div>
        </div>
    );
}
