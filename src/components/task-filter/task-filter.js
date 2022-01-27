import React, {useContext} from "react";
import cn from "classnames";
import Context from "../../context/context";

const filterButtons = [
  { name: "All", label: "All" },
  { name: "Active", label: "Active" },
  { name: "Completed", label: "Completed" },
];

function TaskFilter() {
  const {filter, onFilterChange} = useContext(Context)
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

export default TaskFilter;
