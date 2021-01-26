import React, { useState, useRef, useEffect } from 'react';
import TodoList from './TodoList';
import uuidv4 from 'uuid/dist/v4';
import './App.css';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
    const [todos, setTodos] = useState([])
    const todoNameRef = useRef()

    // save our todos to local storage with useEffect
    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
        if (storedTodos) setTodos(storedTodos)
    }, [])

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    }, [todos])

    // this function allows us to toggle todos from complete to incomplete and vice versa
    function toggleTodo(id) {
        const newTodos = [...todos]
        const todo = newTodos.find(todo => todo.id === id)
        todo.complete = !todo.complete
        setTodos(newTodos)
    }

    function handleAddTodo(e) {
        const name = todoNameRef.current.value
        if (name === '') return
        setTodos(prevTodos => {
            return [...prevTodos, { id: uuidv4, name: name, complete: false }]
        })
        console.log(name)
        // clears out the input field after adding the to-do
        todoNameRef.current.value = null
    }

    function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList className="todoButtons" todos={todos} toggleTodo={toggleTodo} />
      <input className="todoInput" ref={todoNameRef} type="text" />
      <button className="addTodo" onClick={handleAddTodo}>Add a New Todo</button>
      <button className="clearTodo" onClick={handleClearTodos}>Clear Completed Items</button>
      <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}

export default App;