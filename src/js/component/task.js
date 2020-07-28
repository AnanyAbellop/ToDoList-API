import React from "react";
import PropTypes from "prop-types";
import handleDelete from "./home.js";
export const Task = ([key, tarea, array]) => {
	return (
		<div className="row justify-content-center">
			<label>{tarea}</label>
			<button
				type="button"
				className="btn btn-light "
				onClick={event => handleDelete(array)}>
				<i className="far fa-times-circle" />
			</button>
		</div>
	);
};

Task.propTypes = {
	tarea: PropTypes.string
};
