import React from "react";
import Header from "../../Header/Header";
import "../compStyle.css";

/**
 * @author
 * @function Layout
 **/

const Layout = (props) => {
	return (
		<div>
			<Header />
			{props.children}
		</div>
	);
};

export default Layout;
