import React from "react";
import PropTypes from "prop-types";
import { Component } from "react/cjs/react.production.min";

export default class EditTaskForm extends Component {
  state = {
    newLabel: "",
  };

  static defaultProps = {
    label: "",
    changeLabel: () => {},
  };

  static propTypes = {
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    changeLabel: PropTypes.func,
  };

  onLabelChange = (event) => {
    this.setState({
      newLabel: this.formattedLabel(event)
    });
  };

  onKeyPress = (event) => {
    const { changeLabel, id, label } = this.props;
    const { newLabel } = this.state;

    if (event.key === "Enter") {
      if (!newLabel) {
        changeLabel(id, label);
      } else {
        changeLabel(id, newLabel);
      }
    }
  };

  formattedLabel(event) {
    return event.target.value.charAt(0).toUpperCase() + event.target.value.slice(1)
  }

  render() {
    const { label } = this.props;
    return (
      <input
        type="text"
        className="edit"
        placeholder={label}
        onChange={this.onLabelChange}
        onKeyPress={this.onKeyPress}
      />
    );
  }
}
