import TaskFilter from "../task-filter";
import propTypes from "prop-types";

const Footer = ({ leftTasksCount, filter, onFilterChange, clearTasks }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{leftTasksCount} items left</span>
      <TaskFilter filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={clearTasks}>
        Clear completed
      </button>
    </footer>
  );
};

Footer.defaultProps = {
  filter: "Active",
  leftTasksCount: 0,
};

Footer.propTypes = {
  filter: (props, propName, componentName) => {
    const value = props[propName];
    if (typeof value === "string") return null;
    else return new TypeError(`${componentName}: ${propName} must be string`);
  },

  leftTasksCount: propTypes.number,
};

export default Footer;
