import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import './index.css'; // Import the CSS file

export default function TodoList() {
    let [todos, setTodos] = useState([{ task: "sample-task", id: uuidv4(), isDone: false, editMode: false }]);
    let [newTodo, setNewTodo] = useState("");

    let addNewTask = () => {
        if (newTodo.trim() !== "") {
            setTodos((prevTodos) => {
                return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false, editMode: false }]
            });
            setNewTodo("");
        }
    };

    let updateTodoValue = (event) => {
        setNewTodo(event.target.value);
    };

    let deleteTodo = (id) => {
        setTodos((prevTodos) => todos.filter((todo) => todo.id !== id));
    };

    let toggleEditMode = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        editMode: !todo.editMode
                    }
                } else {
                    return todo;
                }
            })
        );
    };

    let updateTask = (id, newTask) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        task: newTask,
                        editMode: false
                    }
                } else {
                    return todo;
                }
            })
        );
    };

    let markAsDone = (id) => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        isDone: true
                    }
                } else {
                    return todo;
                }
            })
        );
    };

    let markAllDone = () => {
        setTodos((prevTodos) =>
            prevTodos.map((todo) => ({
                ...todo,
                isDone: true
            }))
        );
    };

    return (
        <div className="container">
            <div className="input-container">
                <input
                    placeholder="Add a task"
                    value={newTodo}
                    onChange={updateTodoValue}
                />
                <button onClick={addNewTask}>Add Task</button>
            </div>
            <hr />
            <h4>Tasks-Todo</h4>
            <ul className="task-list">
                {todos.map((todo) => {
                    return (
                        <li key={todo.id} className={todo.isDone ? "task done" : "task"}>
                            {!todo.editMode ? (
                                <span
                                    onClick={() => toggleEditMode(todo.id)}
                                    style={{ textDecoration: todo.isDone ? "line-through" : "none" }}
                                >
                                    {todo.task}
                                </span>
                            ) : (
                                <input
                                    type="text"
                                    value={todo.task}
                                    onChange={(e) => updateTask(todo.id, e.target.value)}
                                    onBlur={() => updateTask(todo.id, todo.task)}
                                />
                            )}
                            {!todo.isDone && <button onClick={() => markAsDone(todo.id)}>Mark Done</button>}
                            <button className="delete" onClick={() => deleteTodo(todo.id)}>Delete</button>
                        </li>
                    );
                })}
            </ul>
            <button onClick={markAllDone}>Mark Done All</button>
        </div>
    );
}
