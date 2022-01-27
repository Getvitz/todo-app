import React, {useState, useContext} from "react";
import propTypes from "prop-types";
import Context from "../../context/context";

export default function EditTaskForm (props) {
  const [newLabel, setNewLabel] = useState('');
  const {changeLabel} = useContext(Context)

  const formattedLabel = event => event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)

  const onLabelChange = event => {
    setNewLabel(formattedLabel(event))
  };

  const onKeyPress = event => {
    const { id, label } = props;

    if (event.key === "Enter") {
      if (!newLabel) {
        changeLabel(id, label);
      } else {
        changeLabel(id, newLabel);
      }
    }
  };

  const { label } = props;

return (
  <input
    type="text"
    className="edit"
    placeholder={label}
    onChange={onLabelChange}
    onKeyPress={onKeyPress}
  />
);
}

EditTaskForm.defaultProps = {
    label: "",
  };

EditTaskForm.propTypes = {
    label: propTypes.string,
    id: propTypes.string.isRequired,
  };