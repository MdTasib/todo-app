import React from "react";
import { useQuery } from "react-query";
import Loading from "./Loading";
import TodoCard from "./TodoCard";

const Todos = ({ isReload }) => {
	// load all todos from database
	const {
		data: todos,
		isLoading,
		refetch,
	} = useQuery(["todos", isReload], () =>
		fetch("https://sheltered-cliffs-16466.herokuapp.com/todo").then(res =>
			res.json()
		)
	);

	if (isLoading) {
		return <Loading />;
	}

	return (
		<div>
			{todos.map(todo => (
				<TodoCard key={todo._id} todo={todo} refetch={refetch} />
			))}
		</div>
	);
};

export default Todos;
