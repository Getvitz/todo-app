import React, {useContext} from "react";
import { formatDistanceToNow } from "date-fns";
import Task from "../task";
import Context from "../../context/context";

function TaskList() {
  const {visibleTasks} = useContext(Context)
  const elements = visibleTasks.map((item) => {
    const created = new Date(item.createTime);
    const createTimeToNow = formatDistanceToNow(created, {
      includeSeconds: true,
    });
    const { id } = item;
    return (
      <Task
        key={id}
        id={id}
        label={item.label}
        completed={item.completed}
        createTimeToNow={createTimeToNow}
        edited={item.edited}
        min={+item.min}
        sec={+item.sec}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
}

export default TaskList;

