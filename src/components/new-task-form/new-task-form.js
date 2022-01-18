import React from "react";
import propTypes from "prop-types";
import { Component } from "react/cjs/react.production.min";

export default class NewTaskForm extends Component {
  state = {
    label: "",
    min: "",
    sec: ""
  };

  onLabelChange = (event) => {
    this.setState({
      label: this.formattedLabel(event),
    });
  };

  onTimerMinChange = (event) => {
    this.setState({
      min: event.target.value,
    });
  };

  onTimerSecChange = (event) => {
    this.setState({
      sec: event.target.value,
    });
  };

  onSubmit = (event) => {
    if(event.key !== 'Enter' && event.target.type !== 'button') return;
    const {label, min, sec} = this.state;
    const {addTask} = this.props;
    event.preventDefault();
    addTask(label, min, sec);
    this.setState({
      label: "",
      min: "",
      sec: ""
    });
  };

  formattedLabel(event) {
    return event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
  }

  render() {
    const {label, min, sec} = this.state;
    return (
      <header className="header">
        <h1>todos</h1>
        <form onSubmit={this.onSubmit}>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            onChange={this.onLabelChange}
            value={label}
            onKeyPress={this.onSubmit}
          />
          <input className="new-todo-form__timer" placeholder="Min" value={min} onChange={this.onTimerMinChange} onKeyPress={this.onSubmit} />
          <input className="new-todo-form__timer" placeholder="Sec" value={sec} onChange={this.onTimerSecChange}  onKeyPress={this.onSubmit}/>
          <button type="button" className="add-btn" onClick={this.onSubmit}>Add to list</button>
        </form>
      </header>
    );
  }
}

NewTaskForm.propTypes = {
  addTask: propTypes.func.isRequired
}
