import propTypes from 'prop-types';
import TaskFilter from '../task-filter';

const Footer = ({
	leftTasksCount, filter, onFilterChange, clearTasks,
}) => (
	<footer className="footer">
		<span className="todo-count">{leftTasksCount} items left</span>
		<TaskFilter filter={filter} onFilterChange={onFilterChange} />
		<button className="clear-completed" onClick={clearTasks}>
        Clear completed
		</button>
	</footer>
);

Footer.defaultProps = {
	filter: 'Active',
	leftTasksCount: 0,
};

Footer.propTypes = {
	filter: (props, propName, componentName) => {
		const value = props[propName];
		if (typeof value === 'string') return null;
		return new TypeError(`${componentName}: ${propName} must be string`);
	},

	leftTasksCount: propTypes.number,
};

export default Footer;
