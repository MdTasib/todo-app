import React from "react";
import { useSignInWithGoogle } from "react-firebase-hooks/auth";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import Loading from "./Loading";

const GoogleAuth = () => {
	const [signInWithGoogle, user, loading, error] = useSignInWithGoogle(auth);
	const navigate = useNavigate();
	const location = useLocation();

	const from = location.state?.from?.pathname || "/";

	if (loading) {
		return <Loading />;
	}

	if (error) {
		toast.error(error.message);
	}

	if (user) {
		navigate(from, { replace: true });
	}

	return (
		<button
			onClick={() => signInWithGoogle()}
			className='btn btn-outline-warning'>
			Continue With Google
		</button>
	);
};

export default GoogleAuth;
