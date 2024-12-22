import React, {FC} from "react";
import {ITodo} from "../types";
type typeTodoItemProp = {
	todo: ITodo;
	index: number;
	removeTodo: (id: number) => void;
	changeComplete: (id: number, complete: boolean) => void;
};
export const ToDoItem: FC<typeTodoItemProp> = ({todo, index, removeTodo, changeComplete}) => {
	return (
		<div className="item" style={{display: "flex", gap: "10px"}}>
			<div className="index">{index + 1}</div>
			<div className="title">{todo.task}</div>
			<div className="btns">
				<input
					onChange={() => {
						changeComplete(todo.id, todo.completed);
					}}
					checked={todo.completed}
					className="complete"
					type="checkbox"
				></input>
				<button
					className="delete"
					onClick={() => {
						removeTodo(todo.id);
					}}
				>
					delete
				</button>
			</div>
		</div>
	);
};
