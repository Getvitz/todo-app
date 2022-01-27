import React, {useState, useContext} from "react";
import Context from "../../context/context";

export default function NewTaskForm () {

  const [label, setLabel] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const {addTask} = useContext(Context);

  const formattedLabel = (event) => event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1);


  const onLabelChange = (event) => {
    setLabel(formattedLabel(event))
  };

  const onTimerMinChange = (event) => {
    event.preventDefault()
    setMin(event.target.value)
  };

  const onTimerSecChange = (event) => {
    setSec(event.target.value)

  };

  const onSubmit = (event) => {
    if(event.target.type === 'number') {
    if (!/[0-9]/.test(event.key)) {
      event.preventDefault();
    }
  }
   if(event.key === 'Enter') {
    addTask(label, min, sec);
    setLabel('');
    setMin('');
    setSec('');
    }
  };

  return (
    <header className="header">
      <h1>todos</h1>
      <form onSubmit={onSubmit}>
        <input
          className="new-todo"
          placeholder="Whats need to be done?"
          onChange={onLabelChange}
          value={label}
          onKeyPress={onSubmit}
        />
        <input className="new-todo-form__timer" placeholder="Min" overflow="hidden" type="number" value={min} onChange={onTimerMinChange} onKeyPress={onSubmit}/>
        <input className="new-todo-form__timer" placeholder="Sec" type="number" value={sec} onChange={onTimerSecChange}  onKeyPress={onSubmit}/>
      </form>
    </header>
  );
}
