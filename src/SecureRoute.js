import React from "react";
import { Redirect, Route } from "react-router-dom";

export default function SecureRoute({ children, ...rest }) {
	return (
		<>
			<Route
				{...rest}
				render={() =>
					localStorage.getItem("user") &&
					JSON.parse(localStorage.getItem("user")) ? (
						children
					) : (
						<Redirect to="/login" />
					)
				}
			/>
		</>
	);
}
