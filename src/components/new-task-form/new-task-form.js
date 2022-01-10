import React from "react";
import propTypes from "prop-types";
import { Component } from "react/cjs/react.production.min";

export default class NewTaskForm extends Component {
  state = {
    label: "",
  };

  onLabelChange = (event) => {
    this.setState({
      label: event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1),
    });
  };

  onSubmit = (event) => {
    const {label} = this.state;
    const {addTask} = this.props;
    event.preventDefault();
    addTask(label);
    this.setState({
      label: "",
    });
  };

  render() {
    const {label} = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
          />
          <button type="button" className="add-btn" onClick={this.onSubmit}>Add to list</button>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: propTypes.func.isRequired
}
