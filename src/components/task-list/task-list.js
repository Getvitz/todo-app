import { formatDistanceToNow } from 'date-fns';
import propTypes from 'prop-types';
import { Component } from 'react/cjs/react.production.min';
import Task from '../task';

export default class TaskList extends Component {
	render() {
		const {
			todos, onDeleted, onToggleDone, editTask, changeLabel,
		} = this.props;
		const elements = todos.map((item) => {
			const created = new Date(item.createTime);
			const createTimeToNow = formatDistanceToNow(created, {
				includeSeconds: true,
			});
			const { id } = item;
			return (
				<Task
					key={id}
					id={id}
					label={item.label}
					onDeleted={() => onDeleted(id)}
					onToggleDone={() => onToggleDone(id)}
					completed={item.completed}
					createTimeToNow={createTimeToNow}
					editTask={() => editTask(id)}
					changeLabel={changeLabel}
					edited={item.edited}
				/>
			);
		});

		return <ul className="todo-list">{elements}</ul>;
	}
}

TaskList.defaultProps = {
	todos: [
		{ label: 'Default task 1', completed: false, id: 1 },
		{ label: 'Default task 2', completed: false, id: 2 },
	],
	onToggleDone: () => {},
	onDeleted: () => {},
};

TaskList.propTypes = {
	todos: propTypes.arrayOf(propTypes.object),
};
