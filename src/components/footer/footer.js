import TaskFilter from "../task-filter";

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

export default Footer;
