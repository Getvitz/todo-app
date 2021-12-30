import Task from "../task";
// import "./todo-list.css";

const TaskList = ({ todos, onDeleted }) => {
  const elements = todos.map((item) => {
    return (
      <Task
        key={item.id}
        label={item.label}
        onDeleted={() => onDeleted(item.id)}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
