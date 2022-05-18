import { updateProfile } from "firebase/auth";
import React from "react";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import GoogleAuth from "./GoogleAuth";
import Loading from "./Loading";

const Singup = () => {
	const [createUserWithEmailAndPassword, user, loading, error] =
		useCreateUserWithEmailAndPassword(auth);
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	// handle sing up form
	const handleSubmit = async event => {
		event.preventDefault();
		const name = event.target.name.value;
		const email = event.target.email.value;
		const password = event.target.password.value;
		const confirmPass = event.target.confirmPass.value;

		// check password and confirm password match
		if (password !== confirmPass) {
			toast.error("Password must be same");
			return;
		} else {
			await createUserWithEmailAndPassword(email, password);
			await updateProfile({ displayName: name });
		}
	};

	if (user) {
		navigate(from, { replace: true });
	}

	if (loading) {
		return <Loading />;
	}

	return (
		<div className='singup p-5'>
			<div className='container w-50 bg-light py-5 rounded'>
				<h4 className='text-center text-dark'>Sing Up</h4>
				<form onSubmit={handleSubmit} className='px-5'>
					<input
						name='name'
						type='text'
						className='form-control my-3'
						placeholder='Name'
						required
					/>
					<input
						name='email'
						type='email'
						className='form-control my-3'
						placeholder='Email'
						required
					/>
					<input
						name='password'
						type='password'
						className='form-control my-3'
						placeholder='Password'
						required
					/>
					<input
						name='confirmPass'
						type='password'
						className='form-control my-3'
						placeholder='Confirm Password'
						required
					/>
					<input
						type='submit'
						className='form-control btn btn-dark'
						value='Login'
					/>
				</form>
				<p className='text-danger'>{error && error?.message}</p>
				<div className='text-center text-dark pt-3'>
					<small>Alrady have an account ?</small>
					<Link to='/login' className='text-decoration-none mx-2 fw-bold'>
						Login
					</Link>
				</div>
				<div className='text-center mt-3'>
					<GoogleAuth />
				</div>
			</div>
		</div>
	);
};

export default Singup;
