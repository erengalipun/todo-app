import React, { useState } from "react";

export default function TaskEdit({ tasks, onSave, onCancel }) {
  const currentDate = new Date().toISOString().split("T")[0];
  const [title, setTitle] = useState(tasks.title);
  const [description, setDescription] = useState(tasks.description);
  const [dueDate, setDueDate] = useState(tasks.dueDate);
  const [priority, setPriority] = useState(tasks.priority);

  const handleSave = (e) => {
    e.preventDefault();
    onSave({ ...tasks, title, description, dueDate, priority });
  };

  return (
    <>
      <form className="task-form" onSubmit={handleSave}>
        <div>
          <label>Title: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Set your task title..."
            maxLength="50"
          />
        </div>
        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe your task..."
            maxLength="150"
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
        <div>
          <label>Priority:</label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="" disabled hidden>
              Set
            </option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <button type="submit">Save</button>
        <button onClick={onCancel}>Cancel</button>
      </form>
    </>
  );
}
