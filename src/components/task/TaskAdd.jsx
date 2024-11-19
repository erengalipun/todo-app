import React, { useState } from "react";
import CryptoJS from "crypto-js";

export default function TaskAdd({ tasks, setTasks }) {
  const currentDate = new Date().toISOString().split("T")[0];
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Low");
  const [dueDate, setDueDate] = useState(currentDate);

  const handleAddTask = (e) => {
    e.preventDefault();

    const uniqueId = CryptoJS.MD5(new Date().toISOString()).toString();

    const newTasks = {
      id: uniqueId,
      title: title,
      description: description,
      priority: priority,
      dueDate: dueDate,
      isCompleted: false,
      isExpired: false,
      createdDate: currentDate,
    };

    setTasks([...tasks, newTasks]);

    setTitle("");
    setDescription("");
    setPriority("");
    setDueDate(currentDate);
  };

  return (
    <>
      <form className="task-form" onSubmit={handleAddTask}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
            maxLength="50"
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Task description"
            maxLength="150"
            required
          />
        </div>
        <div>
          <label>Due Date:</label>
          <input
            type="date"
            min={currentDate}
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>
        <div className="select">
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">Add Task</button>
      </form>
    </>
  );
}
