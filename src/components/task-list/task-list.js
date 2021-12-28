import Task from "../task";
// import "./todo-list.css";

const TaskList = ({ todos }) => {
  const elements = todos.map((item) => {
    return <Task key={item.id} label={item.label} />;
  });

  return (
    <ul className="todo-list">
      <li className="completed">{elements[0]}</li>
      <li className="editing">{elements[1]}</li>
      <li>{elements[2]}</li>
    </ul>
  );
};

export default TaskList;
