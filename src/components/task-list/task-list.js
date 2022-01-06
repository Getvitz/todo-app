import propTypes from "prop-types";
import Task from "../task";

const TaskList = ({ todos, onDeleted, onToggleDone }) => {
  const elements = todos.map((item) => {
    return (
      <Task
        key={item.id}
        label={item.label}
        onDeleted={() => onDeleted(item.id)}
        onToggleDone={() => onToggleDone(item.id)}
        completed={item.completed}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

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
};

export default TaskList;
