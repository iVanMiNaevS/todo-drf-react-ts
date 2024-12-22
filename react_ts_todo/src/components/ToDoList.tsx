import React, {FC, ReactNode} from "react";
import {ITodo} from "../types";
import {ToDoItem} from "./ToDoItem";
interface ITodoListProps {
	todos: ITodo[];
	removeTodo: (id: number) => void;
	changeComplete: (id: number, complete: boolean) => void;
}
export const ToDoList: FC<ITodoListProps> = ({todos, removeTodo, changeComplete}) => {
	return (
		<div className="list" style={{marginTop: "60px"}}>
			{todos.length == 0 ? (
				<div>EMPTY</div>
			) : (
				todos.map((todo: ITodo, index: number): ReactNode => {
					return (
						<ToDoItem
							key={todo.id}
							todo={todo}
							index={index}
							removeTodo={removeTodo}
							changeComplete={changeComplete}
						/>
					);
				})
			)}
		</div>
	);
};
