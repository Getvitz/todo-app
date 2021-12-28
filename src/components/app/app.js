import React from "react";

// import Task from "../task";
import TaskList from "../task-list";
// import TaskFilter from "../task-filter";
import NewTaskForm from "../new-task-form";
import Footer from "../footer";
// import Footer from "../footer";

// import "./app.css";

const App = () => {
  return (
    <div className="todoapp">
      <NewTaskForm />
      <section className="main">
        <TaskList />
        <Footer />
      </section>
    </div>
  );
};

export default App;
