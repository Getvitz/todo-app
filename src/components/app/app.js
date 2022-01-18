import React, { Component } from "react";
import { v4 as uuidv4 } from 'uuid';
import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";

export default class App extends Component {

  ACTIONS = {
    ALL: 'All',
    ACTIVE: 'Active',
    COMPLETED: 'Completed'
  }
   
  state = {
    todoData: [],
    filter: this.ACTIONS.ALL,
  };

  componentDidMount() {
    this.setState({
      todoData: window.localStorage.getItem('todoData') ? JSON.parse(window.localStorage.getItem('todoData')) : [],
    })
  }

  addTask = (text, min, sec) => {
    const {todoData} = this.state;
    const newTask = this.createTask(text, min, sec);
    const newArr = [...todoData, newTask];
    this.sendDataToLs(newArr);
    this.setState({
      todoData: newArr,
    });
  };

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData.filter((item) => item.id !== id)];
      this.sendDataToLs(newArr);
      return {
        todoData: newArr,
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const oldTask = todoData[idx];
      const newTask = { ...oldTask, completed: !oldTask.completed };
      const newArr = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];
      this.sendDataToLs(newArr);
      return {
        todoData: newArr,
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
      this.sendDataToLs(newArr);
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
      this.sendDataToLs(newArr);
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
      todoData.forEach(element => {
        if(!element.completed) newArr.push(element)
      });
      this.sendDataToLs(newArr);
      return {
        todoData: newArr,
      };
    });
  };

  filterTasks(todoData, filter) {
    if (filter === this.ACTIONS.ALL) return todoData;
    if (filter === this.ACTIONS.ACTIVE) {
      return todoData.filter((task) => !task.completed);
    } if (filter === this.ACTIONS.COMPLETED) {
      return todoData.filter((task) => task.completed);
    }
    return null
  }

  createTask(label, min, sec) {
    return {
      label,
      completed: false,
      id: uuidv4(),
      createTime: new Date(),
      edited: false,
      min,
      sec
    };
  }

  sendDataToLs(arr) {
    return window.localStorage.setItem('todoData', JSON.stringify(arr));
  }

  render() {
    const { todoData, filter, min, sec } = this.state;
    const visibleTasks = this.filterTasks(todoData, filter);
    const completedCount = todoData.filter((el) => el.completed).length;
    const leftTasksCount = todoData.length - completedCount;
    let emptyMsg;
    if(visibleTasks.length<1) {
      emptyMsg = 'No tasks here'
    }
    return (
      <div className="todoapp">
        <NewTaskForm addTask={this.addTask} />
        <section className="main">
          <span className="emptyMsg">{emptyMsg}</span>
          <TaskList
            todos={visibleTasks}
            onDeleted={this.deleteTask}
            onToggleDone={this.onToggleDone}
            changeLabel={this.changeLabel}
            editTask={this.editTask}
            min={min}
            sec={sec}
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
