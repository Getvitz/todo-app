import Task from "../task";
// import "./todo-list.css";

const TaskList = () => {
  return (
    <ul className="todo-list">
      <li className="completed">
        <Task label="Completed task" />
      </li>
      <li className="editing">
        <Task label="Editing task" />
      </li>
      <li>
        <Task label="Active task" />
      </li>
    </ul>
  );
};

export default TaskList;
