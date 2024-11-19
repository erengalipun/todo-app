import React, { useState, useEffect } from "react";
import "./Todo.scss";
import TaskAdd from "../task/TaskAdd.jsx";
import DarkMode from "../darkmode/DarkMode.jsx";
import Search from "../search/Search.jsx";
import TaskContainer from "../task/TaskContainer.jsx";
import Logo from "../logo/Logo.jsx";

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }, [tasks]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  console.log("Tasks array:", tasks);

  return (
    <>
      {loading ? (
        <Logo />
      ) : (
        <div className="container">
          <header>
            <img
              className="logo"
              src={require("../../assets/logo.png")}
              alt="logo"
            />
            <h3>Welcome to my to-do app, user!</h3>
            <nav>
              <DarkMode />
              <Search setSearchTerm={setSearchTerm} />
            </nav>
          </header>
          <TaskAdd tasks={tasks} setTasks={setTasks} />
          <main className="task-list">
            <TaskContainer
              tasks={tasks}
              setTasks={setTasks}
              searchTerm={searchTerm}
            />
          </main>
        </div>
      )}
    </>
  );
}
