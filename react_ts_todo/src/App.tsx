import React, {useEffect, useState} from "react";
import {ToDoList} from "./components/ToDoList";
import {ITodo} from "./types";
import "./style.css";
function App() {
	const url = "http://127.0.0.1:8000/todos";
	const [todos, setTodos] = useState<ITodo[]>([]);
	const [value, setValue] = useState("");

	useEffect(() => {
		fetch(`${url}`)
			.then((res) => res.json())
			.then((data: ITodo[]) => setTodos(data));
	}, []);

	function addTodo() {
		fetch(`${url}`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({task: value}),
		})
			.then((res) => res.json())
			.then((data) => setTodos([...todos, data]));

		setValue("");
	}

	function removeTodo(id: number) {
		fetch(`${url}/${id}/`, {
			method: "delete",
		}).then((data) => {
			console.log(data);
			setTodos(
				todos.filter((todo) => {
					if (todo.id !== id) {
						return todo;
					}
				})
			);
		});
	}
	const changeComplete = (id: number, complete: boolean): void => {
		fetch(`${url}/${id}/`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: JSON.stringify({completed: !complete}),
		}).then((data) =>
			setTodos(
				todos.map((todo) => {
					if (todo.id !== id) return todo;
					return {
						...todo,
						completed: !todo.completed,
					};
				})
			)
		);
	};

	return (
		<div className="App">
			<div className="bg-circle bg-circle1"></div>
			<div className="bg-circle bg-circle2"></div>
			<div className="bg-circle bg-circle3"></div>
			<div className="bg-circle bg-circle4"></div>
			<div className="input-wrapper">
				<input
					type="text"
					onChange={(e) => {
						setValue(e.target.value);
					}}
					value={value}
				/>
				<button className="bt-add" onClick={addTodo}>
					add
				</button>
			</div>
			<ToDoList todos={todos} removeTodo={removeTodo} changeComplete={changeComplete} />
		</div>
	);
}

export default App;
