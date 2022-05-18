import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import Loading from "./Loading";

const RequireAuth = ({ children }) => {
	const [user, loading] = useAuthState(auth);
	let location = useLocation();

	if (loading) {
		return <Loading />;
	}

	// if user not logedin, then go to login page
	if (!user) {
		return <Navigate to='/login' state={{ from: location }} replace />;
	}

	return children;
};

export default RequireAuth;
