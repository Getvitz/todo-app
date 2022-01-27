import React, {useState, useEffect, useContext} from "react";
import propTypes from "prop-types";
import cn from "classnames";
import Context from "../../context/context";
import EditTaskForm from "../edit-task-form";

export default function Task (props) {
  
  const [isTimerOn, isTimerOnToggle] = useState(false);
  // eslint-disable-next-line react/destructuring-assignment
  const [min, setMin] = useState(props.min);
  // eslint-disable-next-line react/destructuring-assignment
  const [sec, setSec] = useState(props.sec);

  const {onToggleDone, deleteTask, editTask} = useContext(Context);

  const {label, id, createTimeToNow, completed, edited} = props;

  useEffect(() => {
    let interval = null;
    if (isTimerOn) {
      interval = setInterval(() => {
        if(min === 0 && sec === 0 && isTimerOn === true) {
          onToggleDone(id);
          isTimerOnToggle(false);
          return
        }
        if(sec>0) {
          setSec(prev => prev - 1);
          isTimerOnToggle(true);
        }
        else {
          setMin(min - 1);
          setSec(59)
        }
      }, 1000);
    } else if (!isTimerOn && sec !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isTimerOn, sec, min, onToggleDone, id]);

  const pressStart = () => {
    isTimerOnToggle(true);
  }

  const pressPause = () => {
    isTimerOnToggle(false);
  }


  const timerButtons = !isTimerOn ? (
    <button type="button" aria-label="press Start" className="icon icon-play" onClick={pressStart}  />
  ) : (
    <button type="button" aria-label="press Pause" className="icon icon-pause" onClick={pressPause} />
  );

  return (
    <li key={id} className={cn('view', {'completed' : completed}, {'editing' : edited})}>
      <input
        className="toggle"
        type="checkbox"
        onClick={() => onToggleDone(id)}
        checked={completed || false}
        readOnly
      />
      <label>
        <span className="description" role='button' tabIndex={0} onClick={() => onToggleDone(id)} onKeyDown={() => onToggleDone(id)}>
          {label || "You created an empty task! Please delete it and type smth."}
        </span>
        <span className="description__time-value">{timerButtons}{min}:{sec}</span>
        <span className="created">{createTimeToNow}</span>
      </label>
      <button aria-label="button" type="button" className="icon icon-edit" onClick={() => editTask(id)} />
      <button aria-label="button" type="button" className="icon icon-destroy" onClick={() => deleteTask(id)} />
      {edited ? (
        <EditTaskForm id={id} label={label}/>
      ) : null}
    </li>
  )
}

  Task.defaultProps = {
    label: "Nothing received..",
    completed: false,
    min: 0,
    sec: 0
  };

  Task.propTypes = {
    label: propTypes.string,
    id: propTypes.string.isRequired,
    completed: propTypes.bool,
    createTimeToNow: propTypes.string.isRequired,
    edited: propTypes.bool.isRequired,
    min: propTypes.number,
    sec: propTypes.number
  }
