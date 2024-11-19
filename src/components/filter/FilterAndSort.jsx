import React, { useState } from "react";

export default function FilterAndSort({ setFilterOptions }) {
  const [priority, setPriority] = useState([]);
  const [isCompleted, setIsCompleted] = useState({
    completed: false,
    incomplete: false,
  });
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handlePriorityChange = (e) => {
    const value = e.target.value;
    setPriority((prev) =>
      prev.includes(value) ? prev.filter((p) => p !== value) : [...prev, value]
    );
  };

  const handleCompletionChange = (type) => {
    setIsCompleted((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const handleApplyFilters = () => {
    setFilterOptions({
      isCompleted:
        isCompleted.completed && isCompleted.incomplete
          ? undefined
          : isCompleted,
      priority: priority.length > 0 ? priority : undefined,
      sortBy,
      sortOrder,
    });
  };

  const handleResetFilters = () => {
    setPriority([]);
    setIsCompleted({ completed: false, incomplete: false });
    setSortBy("");
    setSortOrder("asc");
    setFilterOptions({
      isCompleted: undefined,
      priority: undefined,
      sortBy: "",
      sortOrder: "asc",
    });
  };

  return (
    <div className="filter-sort">
      <div>
        <label>Priority:</label>
        <input
          type="checkbox"
          value="high"
          checked={priority.includes("high")}
          onChange={handlePriorityChange}
        />
        High
        <input
          type="checkbox"
          value="medium"
          checked={priority.includes("medium")}
          onChange={handlePriorityChange}
        />
        Medium
        <input
          type="checkbox"
          value="low"
          checked={priority.includes("low")}
          onChange={handlePriorityChange}
        />
        Low
      </div>

      <div>
        <label>Completion Status:</label>
        <input
          type="checkbox"
          checked={isCompleted.completed}
          onChange={() => handleCompletionChange("completed")}
        />
        Completed
        <input
          type="checkbox"
          checked={isCompleted.incomplete}
          onChange={() => handleCompletionChange("incomplete")}
        />
        Incomplete
      </div>

      <div>
        <label>Sort By:</label>
        <input
          type="radio"
          value="dueDate"
          checked={sortBy === "dueDate"}
          onChange={() => setSortBy("dueDate")}
        />
        Due Date
        <input
          type="radio"
          value="priority"
          checked={sortBy === "priority"}
          onChange={() => setSortBy("priority")}
        />
        Priority
        <input
          type="radio"
          value="title"
          checked={sortBy === "title"}
          onChange={() => setSortBy("title")}
        />
        Title
      </div>

      <div>
        <label>Sort Order:</label>
        <input
          type="radio"
          value="asc"
          checked={sortOrder === "asc"}
          onChange={() => setSortOrder("asc")}
        />
        Ascending
        <input
          type="radio"
          value="desc"
          checked={sortOrder === "desc"}
          onChange={() => setSortOrder("desc")}
        />
        Descending
      </div>
      <section>
        <button onClick={handleApplyFilters}>Apply Filters</button>
        <button onClick={handleResetFilters}>Reset Filters</button>
      </section>
    </div>
  );
}
