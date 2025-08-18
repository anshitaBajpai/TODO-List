import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function TodoApp() {
  const [task, setTask] = useState("");
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = () => {
    if (task.trim() === "") return;
    setTodos([...todos, { id: Date.now(), text: task, completed: false }]);
    setTask("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") addTask();
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearAll = () => {
    setTodos([]);
  };

  
  const sortedTodos = [
    ...todos.filter((t) => !t.completed),
    ...todos.filter((t) => t.completed),
  ];

  return (
    <div style={styles.container}>
      {/* Import Google font */}
      <link
        href="https://fonts.googleapis.com/css2?family=Shadows+Into+Light&display=swap"
        rel="stylesheet"
      />

      <h1 style={styles.title}>📘 To-Do List</h1>

      <div style={styles.inputContainer}>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a task"
          style={styles.input}
        />
        <button onClick={addTask} style={styles.addButton}>
          Add
        </button>
        <button onClick={clearAll} style={styles.clearButton}>
          Clear All
        </button>
      </div>

      <ul style={styles.list}>
        <AnimatePresence>
          {sortedTodos.map((todo) => (
            <motion.li
              key={todo.id}
              style={{
                ...styles.listItem,
                backgroundColor: todo.completed
                  ? "rgba(0, 100, 0, 0.25)"
                  : "rgba(255, 255, 255, 0.3)",
                textDecoration: todo.completed ? "line-through" : "none",
                color: todo.completed ? "#333" : "#000",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                style={styles.checkbox}
              />
              <span style={styles.taskText}>{todo.text}</span>
              <button
                onClick={() => deleteTask(todo.id)}
                style={styles.deleteButton}
              >
                ❌
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(135deg, #43cea2, #185a9d)", 
    fontFamily: "'Shadows Into Light', cursive",
  },
  title: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "48px", 
    color: "white",
  },
  inputContainer: {
    display: "flex",
    justifyContent: "center",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    maxWidth: "300px",
    padding: "12px",
    border: "1px solid #99c2ff",
    borderRadius: "12px",
    fontSize: "16px",
    outline: "none",
  },
  addButton: {
    marginLeft: "10px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#2b7a78", 
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  clearButton: {
    marginLeft: "10px",
    padding: "12px 16px",
    border: "none",
    borderRadius: "12px",
    backgroundColor: "#3a506b", 
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  list: {
    listStyle: "none",
    padding: 0,
    maxWidth: "500px",
    margin: "0 auto",
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    marginBottom: "12px",
    padding: "10px 14px",
    borderRadius: "12px",
    boxShadow: "0 3px 8px rgba(0,0,0,0.1)",
  },
  taskText: {
    flex: 1,
    fontSize: "20px",
    marginLeft: "10px",
  },
  deleteButton: {
    border: "none",
    backgroundColor: "transparent",
    fontSize: "22px",
    cursor: "pointer",
    marginLeft: "10px",
    textDecoration: "none", 
    color: "#ff4d4d",
  },
  checkbox: {
    width: "18px",
    height: "18px",
    cursor: "pointer",
  },
};
