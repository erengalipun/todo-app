import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Task from "./Task.jsx";
import FilterAndSort from "../filter/FilterAndSort.jsx";

export default function TaskContainer({ tasks, setTasks, searchTerm }) {
  const [filterOptions, setFilterOptions] = useState({
    isCompleted: undefined,
    priority: undefined,
    sortBy: undefined,
    sortOrder: "asc",
  });

  const filterAndSortTasks = (filterOptions) => {
    let filteredTasks = tasks;

    if (searchTerm) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          task.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          task.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterOptions.isCompleted !== undefined) {
      filteredTasks = filteredTasks.filter(
        (task) => task.isCompleted === filterOptions.isCompleted
      );
    }

    if (filterOptions.priority !== undefined) {
      filteredTasks = filteredTasks.filter(
        (task) =>
          filterOptions.priority.includes(task.priority) ||
          filterOptions.priority.includes(task.priority.toLowerCase())
      );
    }

    if (filterOptions.sortBy) {
      filteredTasks.sort((a, b) => {
        if (filterOptions.sortBy === "dueDate") {
          return new Date(a.dueDate) - new Date(b.dueDate);
        } else if (filterOptions.sortBy === "priority") {
          return a.priority.localeCompare(b.priority);
        } else if (filterOptions.sortBy === "title") {
          return a.title.localeCompare(b.title);
        }
        return 0;
      });

      if (filterOptions.sortOrder === "desc") {
        filteredTasks.reverse();
      }
    }

    return filteredTasks;
  };

  const handleDeleteTask = (id) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const handleCompleteTask = (id) => {
    const completedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      return task;
    });
    setTasks(completedTasks);
  };

  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const result = filterAndSortTasks(filterOptions);

  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [movedTasks] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, movedTasks);

    setTasks(newTasks);
  };

  useEffect(() => {
    const checkForExpiredTasks = () => {
      const now = new Date();
      const updatedTasks = tasks.map((task) => {
        if (new Date(task.dueDate) < now && !task.isExpired) {
          return { ...task, isExpired: true };
        }
        return task;
      });
      setTasks(updatedTasks);
    };

    checkForExpiredTasks();
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <FilterAndSort
        setFilterOptions={setFilterOptions}
        tasks={tasks}
        setTasks={setTasks}
        searchTerm={searchTerm}
      />
      {tasks.length === 0 ? (
        <p style={{ textAlign: "center", padding: "8px" }}>
          Take the first step to achieve your goals. Add your task now!
        </p>
      ) : result.length === 0 ? (
        <p style={{ textAlign: "center", padding: "8px" }}>No results found.</p>
      ) : (
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {result.map((task, index) => (
                <Draggable key={task.id} draggableId={task.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <Task
                        task={task}
                        handleDeleteTask={handleDeleteTask}
                        handleCompleteTask={handleCompleteTask}
                        handleEditTask={handleEditTask}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </DragDropContext>
  );
}
