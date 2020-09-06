import React from "react";
import PropTypes from "prop-types";

const Task = ({ toDos, deleteTAsk, counter }) => {
	return (
		<div className="container">
			<div className="row justify-content-center">
				<ul className=" btn-light">
					{toDos.map((task, index) => {
						counter = counter + 1;
						return (
							<li key={index}>
								{task.label}
								<button onClick={() => deleteTAsk(index)}>
									<i className="far fa-times-circle" />
								</button>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="row justify-content-center">
				<label>
					{counter}
					{" items left"}
				</label>
			</div>
		</div>
	);
};
export default Task;

Task.propTypes = {
	toDos: PropTypes.array,
	deleteTAsk: PropTypes.func,
	counter: PropTypes.int
};
