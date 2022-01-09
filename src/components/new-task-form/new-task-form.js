import React from 'react';
import { Component } from 'react/cjs/react.production.min';

export default class NewTaskForm extends Component {
	state = {
		label: '',
	};

	onLabelChange = (e) => {
		this.setState({
			label: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
		});
	};

	onSubmit = (e) => {
		e.preventDefault();
		this.props.addTask(this.state.label);
		this.setState({
			label: '',
		});
	};

	render() {
		return (
			<header className="header">
				<h1>todos</h1>
				<form onSubmit={this.onSubmit}>
					<input
						className="new-todo"
						placeholder="What needs to be done?"
						autoFocus
						onChange={this.onLabelChange}
						value={this.state.label}
					/>
					<button className="add-btn">Add to list</button>
				</form>
			</header>
		);
	}
}
