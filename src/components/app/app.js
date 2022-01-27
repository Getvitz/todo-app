import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import Context from "../../context/context";
import TaskList from "../task-list";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";


export default function App() {

  const ACTIONS = {
    ALL: 'All',
    ACTIVE: 'Active',
    COMPLETED: 'Completed'
  }
  
  const [todoData, updateTodoData] = useState([])
  const [filter, changeFilter] = useState('All')

  useEffect(() => {
    updateTodoData(window.localStorage.getItem('todoData') ? JSON.parse(window.localStorage.getItem('todoData')) : [])
  }, [])


  const sendDataToLs = (arr) => window.localStorage.setItem('todoData', JSON.stringify(arr));
  // eslint-disable-next-line arrow-body-style
  const createTask = (label, min, sec) => {
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

  const addTask = (text, min, sec) => {
    const newTask = createTask(text, min, sec);
    updateTodoData([...todoData, newTask]);
    sendDataToLs(todoData);
  };

  const deleteTask = (id) => {
    updateTodoData([...todoData.filter((item) => item.id !== id)]);
    sendDataToLs(todoData);
  };

  const onToggleDone = (id) => {
    const idx = todoData.findIndex((el) => el.id === id);
    const oldTask = todoData[idx];
    const newTask = { ...oldTask, completed: !oldTask.completed };
    const newArr = [
        ...todoData.slice(0, idx),
        newTask,
        ...todoData.slice(idx + 1),
      ];
    sendDataToLs(newArr);
    updateTodoData(newArr)
  };

  const changeLabel = (id, label) => {
    updateTodoData(() => todoData.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          label,
          completed: false,
          edited: false,
        };
      }
      return el;
    }))
    sendDataToLs(todoData);
  };

  const editTask = id => {
    updateTodoData(() => todoData.map((el) => {
      if (el.id === id) {
        return {
          ...el,
          edited: true,
        };
      }
      return el;
    }));
    sendDataToLs(todoData);
  };

  const onFilterChange = filt => changeFilter(filt)

  const clearTasks = () => {
    updateTodoData(() => todoData.filter((el) => el.completed === false));
    sendDataToLs(todoData);
  };

  const filterTasks = (data, filters) => {
    if (filters === ACTIONS.ALL) return data;
    if (filters === ACTIONS.ACTIVE) {
      return data.filter((task) => !task.completed);
    } if (filters === ACTIONS.COMPLETED) {
      return data.filter((task) => task.completed);
    }
    return null
  }

    const visibleTasks = filterTasks(todoData, filter);
    const completedCount = todoData.filter((el) => el.completed).length;
    const leftTasksCount = todoData.length - completedCount;
    let emptyMsg;
    if(visibleTasks.length < 1) {
      emptyMsg = 'No tasks here'
    }

    return (
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      <Context.Provider value={{
        changeLabel,
        addTask,
        onToggleDone,
        deleteTask,
        editTask,
        filter,
        onFilterChange,
        visibleTasks,
        leftTasksCount,
        clearTasks, 
      }}>
      <div className="todoapp">
        <NewTaskForm />
        <section className="main">
          <span className="emptyMsg">{emptyMsg}</span>
          <TaskList />
          <Footer />
        </section>
      </div>
      </Context.Provider>
    );

}
