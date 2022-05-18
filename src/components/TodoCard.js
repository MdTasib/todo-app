import React from "react";
import toast from "react-hot-toast";

const TodoCard = ({ todo, refetch }) => {
	const { name, description, _id, complete } = todo;

	// handle todo item delete
	const handleDelete = id => {
		fetch(`http://localhost:5000/todo/${_id}`, {
			method: "DELETE",
			headers: { "content-type": "application/json" },
		})
			.then(res => res.json())
			.then(data => {
				toast.success("Successfully Deleted TODO");
				refetch();
			});
	};

	// handle todo item complete
	const handleComplete = id => {
		fetch(`http://localhost:5000/todo/${_id}`, {
			method: "PUT",
			headers: { "content-type": "application/json" },
		})
			.then(res => res.json())
			.then(data => {
				console.log(data);
				toast.success("Conplete Successfully");
				refetch();
			});
	};

	return (
		<div className='card mb-3'>
			<div className='row g-0 align-items-center'>
				<div className='col-md-8'>
					<div className='card-body'>
						<h5
							className='card-title text-black fw-bold'
							style={complete && { textDecorationLine: "line-through" }}>
							{name}
						</h5>
						<p
							className='card-text text-dark'
							style={complete && { textDecorationLine: "line-through" }}>
							{description}
						</p>
					</div>
				</div>
				<div className='col-md-4 text-end'>
					{!complete && (
						<button
							onClick={() => handleComplete(_id)}
							className='btn btn-outline-success'>
							COMPLETE
						</button>
					)}
					<button
						onClick={() => handleDelete(_id)}
						className='btn btn-outline-danger mx-3'>
						DELETE
					</button>
				</div>
			</div>
		</div>
	);
};

export default TodoCard;

// style={{
//   textDecorationLine: "line-through",
//   textDecorationStyle: "solid",
// }}
