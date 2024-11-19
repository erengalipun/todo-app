import React from "react";

export default function Search({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-container">
      <input
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  );
}
