import { Component } from "react/cjs/react.production.min";

export default class Task extends Component {
  static defaultProps = {
    label: "Nothing received..",
    completed: false,
    onDeleted: () => {},
    onToggleDone: () => {},
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
    const { label, onDeleted, onToggleDone, completed, createTime } =
      this.props;
    let classNames = "view";
    if (completed === true) {
      classNames += " completed";
    }

    return (
      <li className={classNames}>
        <input className="toggle" type="checkbox" onClick={onToggleDone} />
        <label>
          <span className="description">
            {label ||
              alert(
                "You created empty task! Please delete it and type smth before adding to list!"
              )}
          </span>
          <span className="created">{createTime}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </li>
    );
  }
}
