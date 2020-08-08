import React, { useState } from "react";
import { Task } from "./task";

var counter = 0;

//create your first component
export function Home() {
	const [todo, setTodo] = useState("");
	const [task, setTask] = useState([]);
	const removeTodo = index => {
		const newTodos = [...task];
		newTodos.splice(index, 1);
		setTask(newTodos);
		counter = counter - 1;
	};

	return (
		<div style={{ backgroundColor: "#E4E0DF", color: "#B0B7AF" }}>
			<div className="row justify-content-center">
				<h1>{"TODO'S"}</h1>
			</div>
			<div className="row justify-content-center">
				<input
					type="text"
					name="Tasks"
					placeholder="What needs to be done"
					style={{ border: "0px", backgroundColor: "#E4E0DF" }}
					onChange={event => {
						setTodo(event.target.value);
					}}
					value={todo}
					onKeyPress={e => {
						if (event.keyCode == 13) {
							counter = counter + 1;
							let newTask = {
								name: todo
							};
							setTask([...task, newTask]);
							//alert(newTask.name);
							setTodo("");
						}
					}}
				/>
			</div>

			{task.map((task, index) => {
				return (
					<div
						key={index}
						id="primero"
						className="row justify-content-center  ">
						<label>{task.name}</label>
						<label
							type="button"
							className="btn primero  "
							onClick={() => removeTodo(index)}>
							{"x"}
						</label>
					</div>
				);

				//	return (<Task key={index} tarea={task.name} />);
			})}

			<div className="row justify-content-center">
				<label>
					{counter}
					{" items left"}
				</label>
			</div>
		</div>
	);
}
