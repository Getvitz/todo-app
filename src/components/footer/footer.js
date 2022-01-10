import React from "react";
import propTypes from "prop-types";
import TaskFilter from "../task-filter";

function Footer({ leftTasksCount, filter, onFilterChange, clearTasks }) {
  return (
    <footer className="footer">
      <span className="todo-count">{leftTasksCount} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button type="button" className="clear-completed" onClick={clearTasks}>
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  filter: "Active",
  leftTasksCount: 0,
};

Footer.propTypes = {
  filter: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value === "string") return null;
    return new TypeError(`${componentName}: ${propName} must be string`);
  },
  onFilterChange: propTypes.func.isRequired,
  clearTasks: propTypes.func.isRequired,
  leftTasksCount: propTypes.number,
};

export default Footer;
