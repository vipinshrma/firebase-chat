import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { signup } from "../../actions/authActions";
import Layout from "./Layout/Layout";
import Card from "./UI/Card/Card";

export default function Signup(props) {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const dispatch = useDispatch();

	const registerUser = (e) => {
		e.preventDefault();

		const user = {
			firstName,
			lastName,
			email,
			password,
		};

		dispatch(signup(user));
	};

	//  if(auth.authenticated){
	// return <Redirect to={`/`} />
	//  }

	return (
		<Layout>
			<div className="registerContainer">
				<Card>
					<form onSubmit={registerUser}>
						<h3>Sign up</h3>

						<input
							name="firstName"
							type="text"
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="First Name"
						/>

						<input
							name="lastName"
							type="text"
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Last Name"
						/>

						<input
							name="email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
						/>

						<input
							name="password"
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
						/>

						<div>
							<button>Sign up</button>
						</div>
					</form>
				</Card>
			</div>
		</Layout>
	);
}
