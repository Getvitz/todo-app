import React, {useContext} from "react";
import Context from "../../context/context";
import TaskFilter from "../task-filter";

function Footer() {
  const {leftTasksCount, filter, onFilterChange, clearTasks} = useContext(Context)
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

export default Footer;
