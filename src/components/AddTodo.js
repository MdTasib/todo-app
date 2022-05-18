import React from "react";
import toast from "react-hot-toast";

const AddTodo = ({ reload: [isReload, setIsReload] }) => {
	// handle Add New Todo item and post on database
	const handleSubmit = event => {
		event.preventDefault();
		const name = event.target.name.value;
		const description = event.target.description.value;

		fetch("http://localhost:5000/todo", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ name, description }),
		})
			.then(res => res.json())
			.then(data => {
				toast.success("Successfully Added Your TODO");
				setIsReload(!isReload);
			});

		event.target.reset();
	};

	return (
		<form
			onSubmit={handleSubmit}
			className='row g-3 align-items-center bg-white text-black pb-4 px-3 my-5 rounded'>
			<div className='col-md-4'>
				<label htmlFor='todo-name' className='form-label'>
					Name
				</label>
				<input
					type='text'
					name='name'
					className='form-control'
					id='todo-name'
				/>
			</div>
			<div className='col-md-4'>
				<label htmlFor='todo-description' className='form-label'>
					Description
				</label>
				<input
					type='text'
					name='description'
					className='form-control'
					id='todo-description'
				/>
			</div>
			<div className='col-md-4 pt-4 text-end'>
				<button type='submit' className='btn btn-dark w-50'>
					ADD
				</button>
			</div>
		</form>
	);
};

export default AddTodo;
