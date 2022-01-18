import React from "react";
import propTypes from "prop-types";
import cn from "classnames";
import { Component } from "react/cjs/react.production.min";
import EditTaskForm from "../edit-task-form";

export default class Task extends Component {
  
  state = {
    isTimerOn: false,
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    min: this.props.min,
    // eslint-disable-next-line react/prop-types,react/destructuring-assignment
    sec: this.props.sec
  }

  componentWillUnmount() {
    clearInterval(this.counter);
  }

  pressStart = () => {
    this.setState({
      isTimerOn: true,
    })
    this.counter = setInterval(() => {
      this.secCountdown();
    }, 1000);
  }

  pressPause = () => {
    this.setState({
      isTimerOn: false
    })
    clearInterval(this.counter)
  }

  secCountdown = () => {
    const {min, sec, isTimerOn} = this.state;
    const {onToggleDone} = this.props;
    if(min === 0 && sec === 0 && isTimerOn === true) {
      onToggleDone();
      clearInterval(this.counter);
      this.setState({isTimerOn: false})
      return
    }
    if(sec>0) {
      this.setState({
        sec: sec - 1,
        isTimerOn: true
      })
    }
    else {
      this.minCountdown()
    }
  }

  minCountdown = () => {
    const { min } = this.state;
    this.setState({
      min: min - 1,
      sec: 59,
    });
  }

  render() {
    const {label, id, onDeleted, onToggleDone, completed, createTimeToNow, editTask, changeLabel, edited} = this.props;
    const { isTimerOn, min, sec } = this.state;
    let checked = false;
    if (completed === true) {
      checked = true;
    }
    const timerButtons = !isTimerOn ? (
      <button type="button" aria-label="press Start" className="icon icon-play" onClick={this.pressStart}  />
    ) : (
      <button type="button" aria-label="press Pause" className="icon icon-pause" onClick={this.pressPause} />
    );
    return (
      <li key={id} className={cn('view', {'completed' : completed}, {'editing' : edited})}>
        <input
          className="toggle"
          type="checkbox"
          onClick={onToggleDone}
          readOnly
          checked={checked}
        />
        <label>
          <span className="description" role='button' tabIndex={0} onClick={onToggleDone} onKeyDown={onToggleDone}>
            {label || "You created an empty task! Please delete it and type smth."}
          </span>
          <span className="description__time-value">{timerButtons}{min}:{sec}</span>
          <span className="created">{createTimeToNow}</span>
        </label>
        <button aria-label="button" type="button" className="icon icon-edit" onClick={editTask} />
        <button aria-label="button" type="button" className="icon icon-destroy" onClick={onDeleted} />
        {edited ? (
          <EditTaskForm id={id} label={label} changeLabel={changeLabel} />
        ) : null}
      </li>
    )}
}

  Task.defaultProps = {
    label: "Nothing received..",
    completed: false,
    onDeleted: () => {},
    onToggleDone: () => {},
    min: 0,
    sec: 0
  };

  Task.propTypes = {
    label: propTypes.string,
    id: propTypes.string.isRequired,
    completed: propTypes.bool,
    onDeleted: propTypes.func,
    onToggleDone: propTypes.func,
    createTimeToNow: propTypes.string.isRequired,
    editTask: propTypes.func.isRequired,
    changeLabel: propTypes.func.isRequired,
    edited: propTypes.bool.isRequired,
    min: propTypes.number,
    sec: propTypes.number
  }
