import Task from "../task";
// import "./todo-list.css";

const TaskList = ({ todos, onDeleted, onToggleDone, completed }) => {
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

export default TaskList;
