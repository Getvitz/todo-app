// import Task from "../task";
// import "./todo-list.css";
import { formatDistanceToNow } from "date-fns";
import { Component } from "react/cjs/react.production.min";

export default class Task extends Component {
  state = {
    createTime: "just added",
    isMounted: false,
  };

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

  componentDidMount() {
    this.isMounted = true;
    this.timerID = this.tick();
  }

  componentWillUnmount() {
    this.isMounted = false;
    clearInterval(this.timerID);
  }

  tick() {
    const created = new Date();
    this.createTime = setInterval(
      () =>
        this.setState({
          createTime: formatDistanceToNow(created, {
            includeSeconds: true,
          }),
        }),
      4000
    );
    this.isMounted = false;
  }

  render() {
    const { label, onDeleted, onToggleDone, completed } = this.props;
    let isMounted = false;
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
          <span className="created">{this.state.createTime}</span>
        </label>
        <button className="icon icon-edit"></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </li>
    );
  }
}
