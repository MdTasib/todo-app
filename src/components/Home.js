import React, { useState } from "react";
import AddTodo from "./AddTodo";
import Todos from "./Todos";

const Home = () => {
	const [isReload, setIsReload] = useState(true);
	return (
		<div className='p-5'>
			<div className='text-center'>
				<h2>To-Do App!</h2>
				<p>Add Now To-Do</p>
			</div>
			<AddTodo reload={[isReload, setIsReload]} />
			<Todos isReload={isReload} />
		</div>
	);
};

export default Home;
