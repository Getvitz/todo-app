import React from "react";
import propTypes from "prop-types";
import EditTaskForm from "../edit-task-form";


function Task({label, id, onDeleted, onToggleDone, completed, createTimeToNow, editTask, changeLabel, edited}) {
  let checked = false;
  let classNames = "view";
  if (completed === true) {
      classNames += " completed";
      checked = true;
    }
    if (edited === true) {
      classNames += " editing";
    }

    return (
      <li key={id} className={classNames}>
        <input
          className="toggle"
          type="checkbox"
          onClick={onToggleDone}
          readOnly
          checked={checked}
        />
        <label>
          <span className="description">
            {label ||
              alert(
                "You created empty task! Please delete it and type smth before adding to list!"
              )}
          </span>
          <span className="created">{createTimeToNow}</span>
        </label>
        <button aria-label="button" type="button" className="icon icon-edit" onClick={editTask} />
        <button aria-label="button" type="button" className="icon icon-destroy" onClick={onDeleted} />
        {edited ? (
          <EditTaskForm id={id} label={label} changeLabel={changeLabel} />
        ) : null}
      </li>
    );
  }

  export default Task;

  Task.defaultProps = {
    label: "Nothing received..",
    completed: false,
    onDeleted: () => {},
    onToggleDone: () => {},
  };

  Task.propTypes = {
    label: propTypes.string,
    id: propTypes.number.isRequired,
    completed: propTypes.bool,
    onDeleted: propTypes.func,
    onToggleDone: propTypes.func,
    createTimeToNow: propTypes.string.isRequired,
    editTask: propTypes.func.isRequired,
    changeLabel: propTypes.func.isRequired,
    edited: propTypes.bool.isRequired
  }

//     completed: (props, propName, componentName) => {
//       const value = props[propName];
//       if (typeof value === "boolean") return null;
//       return new TypeError(`${componentName}: ${propName} must be boolean`);
//     },
//   };

//   render() {
//     const {
//       label,
//       id,
//       onDeleted,
//       onToggleDone,
//       completed,
//       createTimeToNow,
//       editTask,
//       changeLabel,
//       edited,
//     } = this.props;
//     let checked = false;
//     let classNames = "view";
//     if (completed === true) {
//       classNames += " completed";
//       checked = true;
//     }
//     if (edited === true) {
//       classNames += " editing";
//     }

//     return (
//       <li key={id} className={classNames}>
//         <input
//           className="toggle"
//           type="checkbox"
//           onClick={onToggleDone}
//           readOnly
//           checked={checked}
//         />
//         <label onClick={onToggleDone}>
//           <span className="description">
//             {label ||
//               alert(
//                 "You created empty task! Please delete it and type smth before adding to list!"
//               )}
//           </span>
//           <span className="created">{createTimeToNow}</span>
//         </label>
//         <button className="icon icon-edit" onClick={editTask} />
//         <button className="icon icon-destroy" onClick={onDeleted} />
//         {edited ? (
//           <EditTaskForm id={id} label={label} changeLabel={changeLabel} />
//         ) : null}
//       </li>
//     );
//   }
// }
