import React, { useState } from "react";
import TaskEdit from "./TaskEdit.jsx";

export default function Task({
  task,
  handleDeleteTask,
  handleCompleteTask,
  handleEditTask,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isInfoVisible, setIsInfoVisible] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
    setIsInfoVisible(false);
  };

  const handleSave = (updatedTasks) => {
    handleEditTask(updatedTasks);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const toggleInfoVisibility = () => {
    setIsInfoVisible(!isInfoVisible);
  };

  return (
    <>
      {isEditing ? (
        <TaskEdit tasks={task} onSave={handleSave} onCancel={handleCancel} />
      ) : (
        <div className="task">
          <div
            className={`task-title ${task.isExpired ? "expired" : ""} ${
              task.isCompleted ? "completed" : ""
            }`}
            onClick={toggleInfoVisibility}
          >
            <label>
              Title: <span className="text">{task.title}</span>
            </label>
            <label>
              Added Date: <span>{task.createdDate}</span>
            </label>
          </div>

          {isInfoVisible && (
            <div className="task-info">
              <span className="text">
                <label>Description: </label>
                {task.description}
              </span>

              <span>
                <label>Due Date: </label>
                {task.dueDate}
              </span>

              <span>
                <label>Priority: </label>
                {task.priority}
              </span>

              <span>
                <label>Completion Status: </label>
                {task.isCompleted ? "Completed" : "Not Completed"}
              </span>
              <div>
                <button
                  onClick={() => handleCompleteTask(task.id)}
                  disabled={task.isExpired}
                  style={{ display: task.isExpired ? "none" : "inline-block" }}
                >
                  {task.isCompleted ? "Undo" : "Done"}
                </button>
                <button onClick={() => handleDeleteTask(task.id)}>
                  Delete
                </button>
                <button
                  onClick={handleEditClick}
                  disabled={task.isExpired}
                  style={{ display: task.isExpired ? "none" : "inline-block" }}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
