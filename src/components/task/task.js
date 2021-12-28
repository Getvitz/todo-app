// import Task from "../task";
// import "./todo-list.css";
import { formatDistanceToNow } from "date-fns";

const Task = (props) => {
  return (
    <div className="view">
      <input className="toggle" type="checkbox" />
      <label>
        <span className="description">{props.label}</span>
        <span className="created">
          {formatDistanceToNow(new Date(2021, 11, 28, 2, 40, 30), {
            includeSeconds: true,
          })}
        </span>
      </label>
      <button className="icon icon-edit"></button>
      <button className="icon icon-destroy"></button>
    </div>
  );
};

export default Task;
