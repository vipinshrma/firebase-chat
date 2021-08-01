import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase";
import { Provider } from "react-redux";
import store from "./store/store";
const config = {
	apiKey: process.env.REACT_APP_FIREBASE_KEY,
	authDomain: "chat-app-221a0.firebaseapp.com",
	databaseURL: "https://chat-app-221a0-default-rtdb.firebaseio.com",
	projectId: "chat-app-221a0",
	storageBucket: "chat-app-221a0.appspot.com",
	messagingSenderId: "819852913196",
	appId: "1:819852913196:web:a85cb27995d028ea95ff89",
};

firebase.initializeApp(config);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
		</BrowserRouter>
	</Provider>,
	document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
