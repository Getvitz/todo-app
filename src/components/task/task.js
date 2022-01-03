// import Task from "../task";
// import "./todo-list.css";
import { formatDistanceToNow } from "date-fns";
import { Component } from "react/cjs/react.production.min";

export default class Task extends Component {
  render() {
    const { label, onDeleted, onToggleDone, completed } = this.props;
    let classNames = "view";
    if (completed === true) {
      classNames += " completed";
    }

    return (
      <li className={classNames}>
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          <span className="description">{label}</span>
          <span className="created">
            {formatDistanceToNow(new Date(2021, 11, 28, 2, 40, 30), {
              includeSeconds: true,
            })}
          </span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </li>
    );
  }
}
