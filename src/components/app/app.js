import React, { Component } from "react";
import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTask("Completed Task"),
      this.createTask("Editing Task"),
      this.createTask("Active Task"),
    ],
    filter: "All",
  };

  addTask = (text) => {
    const newTask = this.createTask(text);
    this.setState(({ todoData }) => {
      const newArr = [...todoData, newTask];
      return {
        todoData: newArr,
      };
    });
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

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };
      const newArray = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];
      return {
        todoData: newArray,
      };
    });
  };

  changeLabel = (id, label) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            label,
            completed: false,
            edited: false,
          };
        }
        return el;
      });
      return {
        todoData: newArr,
      };
    });
  };

  editTask = (id) => {
    this.setState(({ todoData }) => {
      const newArr = todoData.map((el) => {
        if (el.id === id) {
          return {
            ...el,
            edited: true,
          };
        }
        return el;
      });
      return {
        todoData: newArr,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  clearTasks = () => {
    this.setState(({ todoData }) => {
      const newArr = [];
      for (let i = 0; i < todoData.length; i++) {
        if (!todoData[i].completed) {
          newArr.push(todoData[i]);
        }
      }
      return {
        todoData: newArr,
      };
    });
  };

  filterTasks(todoData, filter) {
    if (filter === "All") return todoData;
    if (filter === "Active") {
      return todoData.filter((task) => !task.completed);
    } if (filter === "Completed") {
      return todoData.filter((task) => task.completed);
    }
    return null
  }

  createTask(label) {
    this.maxId += 1
    return {
      label,
      completed: false,
      id: this.maxId,
      createTime: new Date(),
      edited: false,
    };
  }

  render() {
    const { todoData, filter } = this.state;
    const visibleTasks = this.filterTasks(todoData, filter);
    const completedCount = todoData.filter((el) => el.completed).length;
    const leftTasksCount = todoData.length - completedCount;

    return (
      <div className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <TaskList
            todos={visibleTasks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            changeLabel={this.changeLabel}
            editTask={this.editTask}
          />
          <Footer
            leftTasksCount={leftTasksCount}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearTasks={this.clearTasks}
          />
        </section>
      </div>
    );
  }
}
