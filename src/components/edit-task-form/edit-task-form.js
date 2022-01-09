// import react from "react";
import PropTypes from 'prop-types';
import { Component } from 'react/cjs/react.production.min';

export default class EditTaskForm extends Component {
	state = {
		newLabel: '',
	};

	static defaultProps = {
		description: '',
		changeLabel: () => {},
	};

	static propTypes = {
		label: PropTypes.string,
		id: PropTypes.number.isRequired,
		changeLabel: PropTypes.func,
	};

	onLabelChange = (e) => {
		this.setState({
			newLabel:
        e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
		});
	};

	onKeyPress = (event) => {
		const { changeLabel, id, label } = this.props;
		const { newLabel } = this.state;

		if (event.key === 'Enter') {
			if (newLabel === '') {
				changeLabel(id, label);
			} else {
				changeLabel(id, newLabel);
			}
		}
	};

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
