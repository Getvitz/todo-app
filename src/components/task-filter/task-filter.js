import React from "react";
import propTypes from "prop-types";
import cn from "classnames";

const filterButtons = [
  { name: "All", label: "All" },
  { name: "Active", label: "Active" },
  { name: "Completed", label: "Completed" },
];

function TaskFilter({ filter, onFilterChange = () => {} }) {
  const buttons = filterButtons.map(({ name, label }) => {
    const isActive = name === filter;
    return (
      <li key={name}>
        <button
          type="button"
          onClick={() => onFilterChange(name)}
          className={cn({"selected":isActive})}
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
