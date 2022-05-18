import React from "react";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { Link, useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import GoogleAuth from "./GoogleAuth";
import Loading from "./Loading";

const Login = () => {
	const [signInWithEmailAndPassword, user, loading, error] =
		useSignInWithEmailAndPassword(auth);
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	// handle login form
	const handleSubmit = async event => {
		event.preventDefault();
		const email = event.target.email.value;
		const password = event.target.password.value;

		await signInWithEmailAndPassword(email, password);
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
				<h4 className='text-center text-dark'>Login</h4>
				<form onSubmit={handleSubmit} className='px-5'>
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
						type='submit'
						className='form-control btn btn-dark'
						value='Login'
					/>
				</form>
				<p className='text-danger'>{error && error?.message}</p>
				<div className='text-center text-dark pt-3'>
					<small>Don't have account ?</small>
					<Link to='/singup' className='text-decoration-none mx-2 fw-bold'>
						Singup Now
					</Link>
				</div>
				<div className='text-center mt-3'>
					<GoogleAuth />
				</div>
			</div>
		</div>
	);
};

export default Login;
