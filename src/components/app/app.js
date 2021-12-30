import React, { Component } from "react";

// import Task from "../task";
import TaskList from "../task-list";
// import TaskFilter from "../task-filter";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";
// import Footer from "../footer";

// import "./app.css";

export default class App extends Component {
  state = {
    todoData: [
      { label: "Completed task", id: 1 },
      { label: "Editing task", id: 2 },
      { label: "Active task", id: 3 },
    ],
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);

      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];
      return {
        todoData: newArray,
      };
    });
  };

  render() {
    return (
      <div className="todoapp">
        <NewTaskForm />
        <section className="main">
          <TaskList todos={this.state.todoData} onDeleted={this.deleteTask} />
          <Footer />
        </section>
      </div>
    );
  }
}
