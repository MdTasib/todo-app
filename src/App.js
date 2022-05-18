import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import RequireAuth from "./components/RequireAuth";
import Singup from "./components/Singup";

function App() {
	return (
		<div className='bg-dark text-light'>
			<Navbar />
			<div className='container'>
				<Routes>
					<Route
						path='/'
						element={
							<RequireAuth>
								<Home />
							</RequireAuth>
						}
					/>
					<Route path='/login' element={<Login />} />
					<Route path='/singup' element={<Singup />} />
				</Routes>
				<Toaster />
			</div>
		</div>
	);
}

export default App;
