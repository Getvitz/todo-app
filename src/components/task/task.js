import { Component } from "react/cjs/react.production.min";
import EditTaskForm from "../edit-task-form";

export default class Task extends Component {
  static defaultProps = {
    label: "Nothing received..",
    completed: false,
    onDeleted: () => {},
    onToggleDone: () => {},
    // checked: false,
  };

  static propTypes = {
    label: (props, propName, componentName) => {
      const value = props[propName];
      if (typeof value === "string") return null;
      else return new TypeError(`${componentName}: ${propName} must be string`);
    },

    completed: (props, propName, componentName) => {
      const value = props[propName];
      if (typeof value === "boolean") return null;
      else
        return new TypeError(`${componentName}: ${propName} must be boolean`);
    },
  };

  render() {
    const {
      label,
      id,
      onDeleted,
      onToggleDone,
      completed,
      createTimeToNow,
      editTask,
      changeLabel,
      edited,
    } = this.props;
    let checked = false;
    let classNames = "view";
    if (completed === true) {
      classNames += " completed";
      checked = true;
    }
    if (edited === true) {
      classNames += " editing";
    }

    return (
      <li key={id} className={classNames}>
        <input
          className="toggle"
          type="checkbox"
          onClick={onToggleDone}
          readOnly
          checked={checked}
        />
        <label onClick={onToggleDone}>
          <span className="description">
            {label ||
              alert(
                "You created empty task! Please delete it and type smth before adding to list!"
              )}
          </span>
          <span className="created">{createTimeToNow}</span>
        </label>
        <button className="icon icon-edit" onClick={editTask}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
        {edited ? (
          <EditTaskForm id={id} label={label} changeLabel={changeLabel} />
        ) : null}
      </li>
    );
  }
}
