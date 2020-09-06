import React, { useEffect, useState, Fragment } from "react";
import Task from "./Task.js";
import { Container, Col, Row } from "react-bootstrap";
var counter = 0;
const List = () => {
	const [userExists, setUserExist] = useState(true);
	const [toDos, setToDos] = useState([]);
	const [task, setTask] = useState("");
	const URL_BASE = "https://assets.breatheco.de/apis/fake/todos";

	const getTask = async () => {
		try {
			const response = await fetch(`${URL_BASE}/user/ananyabellop`);

			if (response.ok) {
				let tasks = await response.json();
				setToDos(tasks);
			} else {
				console.log("Algo fallo en la consulta");
			}
		} catch (error) {
			console.log("explote", error);
		}
	};
	const addTask = async event => {
		if (event.keyCode == 13) {
			try {
				const response = await fetch(`${URL_BASE}/user/ananyabellop`, {
					method: "PUT",
					body: JSON.stringify([
						...toDos,
						{ label: task, done: false }
					]),
					headers: {
						"Content-Type": "application/json"
					}
				});

				if (response.ok) {
					getTask();
					setTask("");
				} else {
					console.log("fallo la actualizacion");
				}
			} catch (error) {
				console.log("explote");
			}
		}
	};
	const deleteAll = async () => {
		try {
			const response = await fetch(`${URL_BASE}/user/ananyabellop`, {
				method: "DELETE",
				body: JSON.stringify([]),
				headers: {
					"Content-Type": "application/json"
				}
			});

			if (response.ok) {
				setUserExist(true);
			} else {
				console.log("falle");
			}
		} catch (error) {
			console.log("algo fallo delete all");
		}
	};
	const deleteTAsk = async index => {
		try {
			let newTasks = toDos.filter((value, i) => {
				return i != index;
			});
			const response = await fetch(`${URL_BASE}/user/ananyabellop`, {
				method: "PUT",
				body: JSON.stringify(newTasks),
				headers: {
					"Content-Type": "application/json"
				}
			});
			if (response.ok) {
				getTask();
			} else {
				console.log("algo fallo");
				deleteAll();
			}
		} catch (error) {
			console.log("explote", error);
		}
	};
	useEffect(
		() => {
			if (userExists) {
				const verifyUser = async () => {
					try {
						const response = await fetch(
							`${URL_BASE}/user/ananyabellop`
						);
						if (response.ok) {
							getTask();
						} else {
							const addUser = await fetch(
								`${URL_BASE}/user/ananyabellop`,
								{
									method: "POST",
									body: JSON.stringify([]),
									headers: {
										"Content-Type": "application/json"
									}
								}
							);

							if (addUser.ok) {
								getTask();
							} else {
								console.log("Algo fallo al crear el usuario");
							}
						}
						setUserExist(false);
					} catch (error) {
						console.log("explote", error);
					}
				};
				verifyUser();
			}
		},
		[userExists]
	);

	return (
		<div
			className="row justify-content-center"
			style={{ backgroundColor: "#E4E0DF", color: "#B0B7AF" }}>
			<Fragment>
				<Container>
					<Row>
						<Col md={12}>
							<h1 className="text-center">{"To do's list"}</h1>
						</Col>
						<Col md={12}>
							<input
								className="justify-content-center"
								type="text"
								name="Tasks"
								placeholder="What needs to be done"
								style={{
									border: "0px",
									backgroundColor: "#E4E0DF"
								}}
								onKeyUp={addTask}
								onChange={e => setTask(e.target.value)}
								value={task}
							/>
							<Task
								toDos={toDos}
								deleteTAsk={deleteTAsk}
								counter={counter}
							/>
						</Col>
					</Row>
				</Container>
			</Fragment>
		</div>
	);
};

export default List;
