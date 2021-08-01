import "./App.css";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
	useLocation,
} from "react-router-dom";
import RoomList from "./pages/components/RoomList";
import AddRoom from "./pages/components/AddRoom";
import ChatRoom from "./pages/components/ChatRoom";
import SecureRoute from "./SecureRoute";
import Signup from "./pages/components/Signup";
import HomePage from "./pages/components/HomePage";
import Login from "./pages/components/Login";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isLoggedInUser } from "./actions/authActions";

function App() {
	let location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(isLoggedInUser());
	}, []);
	return (
		<>
			<Switch>
				<SecureRoute exact path="/">
					<HomePage />
				</SecureRoute>
				<Route exact path="/login">
					<Login />
				</Route>
				<Route exact path="/signup">
					<Signup />
				</Route>
				<SecureRoute exact path="/roomlist">
					<RoomList />
				</SecureRoute>
				<SecureRoute exact path="/addroom">
					<AddRoom />
				</SecureRoute>
				<SecureRoute exact path="/chatroom/:room">
					<ChatRoom />
				</SecureRoute>
			</Switch>
		</>
	);
}

export default App;
