import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { signIn } from "../../actions/authActions";
import Layout from "./Layout/Layout";
import Card from "./UI/Card/Card";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();
	const authState = useSelector((state) => state.auth);

	if (authState.authenticated) {
		return <Redirect to="/" />;
	}

	const submitHandler = (e) => {
		e.preventDefault();
		if (email === "") {
			alert("email is required");
			return;
		}
		if (password === "") {
			alert("password is required");
			return;
		}
		dispatch(signIn({ email, password }));
	};

	return (
		<Layout>
			<div className="loginContainer">
				<Card>
					<form onSubmit={submitHandler}>
						<input
							name="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<input
							name="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<div>
							<button>Login</button>
						</div>
					</form>
				</Card>
			</div>
		</Layout>
	);
}
