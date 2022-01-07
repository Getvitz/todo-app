import { formatDistanceToNow } from "date-fns";
import propTypes from "prop-types";
import { Component } from "react/cjs/react.production.min";
import Task from "../task";

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone } = this.props;
    const elements = todos.map((item) => {
      const created = new Date(item.createTime);
      const createTime = formatDistanceToNow(created, {
        includeSeconds: true,
      });
      return (
        <Task
          key={item.id}
          label={item.label}
          onDeleted={() => onDeleted(item.id)}
          onToggleDone={() => onToggleDone(item.id)}
          completed={item.completed}
          createTime={createTime}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}

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
