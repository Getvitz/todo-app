import React from "react";

// import Task from "../task";
import TaskList from "../task-list";
// import TaskFilter from "../task-filter";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";
// import Footer from "../footer";

// import "./app.css";

const App = () => {
  const todoData = [
    { label: "Completed task", id: 1 },
    { label: "Editing task", id: 2 },
    { label: "Active task", id: 3 },
  ];

  return (
    <div className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList todos={todoData} />
        <Footer />
      </section>
    </div>
  );
};

export default App;
