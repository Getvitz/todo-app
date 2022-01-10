import React from "react";
import { formatDistanceToNow } from "date-fns";
import propTypes from "prop-types";
import Task from "../task";

function TaskList({ todos, onDeleted, onToggleDone, editTask, changeLabel }) {
  const elements = todos.map((item) => {
    const created = new Date(item.createTime);
    const createTimeToNow = formatDistanceToNow(created, {
      includeSeconds: true,
    });
    const { id } = item;
    return (
      <Task
        key={id}
        id={id}
        label={item.label}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => onToggleDone(id)}
        completed={item.completed}
        createTimeToNow={createTimeToNow}
        editTask={() => editTask(id)}
        changeLabel={changeLabel}
        edited={item.edited}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;

TaskList.defaultProps = {
  todos: [
    { label: "Default task 1", completed: false, id: 1 },
    { label: "Default task 2", completed: false, id: 2 },
  ],
  onToggleDone: () => {},
  onDeleted: () => {},
};

TaskList.propTypes = {
  todos: propTypes.arrayOf(propTypes.object),
  onToggleDone: propTypes.func,
  onDeleted: propTypes.func,
  editTask: propTypes.func.isRequired,
  changeLabel: propTypes.func.isRequired
}

