import React, { useState, useEffect } from "react";

const TodoList = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAdd = () => {
    const trimmedTask = task.trim();
    if (!trimmedTask) return alert("Task cannot be empty.");
    const newTask = {
      id: Date.now(),
      text: trimmedTask,
      completed: false,
    };
    setTasks([newTask, ...tasks]);
    setTask("");
  };

  const toggleCompletion = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const filteredTasks = tasks.filter(t =>
    filter === "completed" ? t.completed :
    filter === "active" ? !t.completed :
    true
  );

  return (
    <div className="todo-container">
      <h2>📝 To-Do List</h2>
      <div className="input-group">
        <input
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder="Add new task..."
        />
        <button onClick={handleAdd}>Add</button>
      </div>

      <div className="filter-group">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("active")}>Active</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTasks.map(({ id, text, completed }) => (
          <li key={id} className={completed ? "completed" : ""}>
            <input
              type="checkbox"
              checked={completed}
              onChange={() => toggleCompletion(id)}
            />
            <span>{text}</span>
            <button onClick={() => handleDelete(id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
