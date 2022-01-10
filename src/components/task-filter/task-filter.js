import React from "react";
import propTypes from "prop-types";

const filterButtons = [
  { name: "All", label: "All" },
  { name: "Active", label: "Active" },
  { name: "Completed", label: "Completed" },
];

function TaskFilter({ filter, onFilterChange = () => {} }) {
  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter;
    const classNames = isActive ? "selected" : "";
    return (
      <li key={name}>
        <button
          type="button"
          onClick={() => onFilterChange(name)}
          className={classNames}
        >
          {label}
        </button>
      </li>
    );
  });

  return <ul className="filters">{buttons}</ul>;
}

TaskFilter.propTypes = {
  filter: propTypes.string.isRequired,
  onFilterChange: propTypes.func.isRequired
}

export default TaskFilter;
