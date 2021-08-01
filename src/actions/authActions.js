import firebase from "firebase";
import { authConstanst } from "./constants";
const { auth, firestore } = firebase;

export const signup = (user) => {
	return async (dispatch) => {
		const db = firestore();
		dispatch({ type: `${authConstanst.USER_LOGIN}__REQUEST` });
		auth()
			.createUserWithEmailAndPassword(user.email, user.password)
			.then((data) => {
				console.log("userData--->", data);
				const currentUser = auth().currentUser;
				console.log("current user===>", currentUser);
				const name = `${user.firstName} ${user.lastName}`;
				console.log("name===>", name);
				currentUser
					.updateProfile({
						displayName: name,
					})
					.then(() => {
						db.collection("users")
							.doc(data.user.uid)
							.set({
								firstName: user.firstName,
								lastName: user.lastName,
								uid: data.user.uid,
								createdAt: new Date(),
								isOnline: true,
							})
							.then(() => {
								const loggedInUser = {
									firstName: user.firstName,
									lastName: user.lastName,
									uid: data.user.uid,
									email: user.email,
								};
								localStorage.setItem("user", JSON.stringify(loggedInUser));
								console.log("user logged in successfully");
								dispatch({
									type: `${authConstanst.USER_LOGIN}_SUCCESS`,
									payload: { user: loggedInUser },
								});
							});
					})
					.catch((e) => {
						dispatch({
							type: `${authConstanst.USER_LOGIN}_FAILURE`,
							payload: { error: e },
						});
					});
			})
			.catch((e) => {
				console.log(e);
			});
	};
};

export const signIn = (user) => {
	return (dispatch) => {
		dispatch({ type: `${authConstanst.USER_LOGIN}__REQUEST` });
		auth()
			.signInWithEmailAndPassword(user.email, user.password)
			.then((data) => {
				let db = firebase.firestore();
				db.collection("users")
					.doc(data.user.uid)
					.update({
						isOnline: true,
					})
					.then(() => {
						console.log("login data===?", data);
						const userName = data.user.displayName.split(" ");
						let firstName = userName[0];
						let lastName = userName[1];
						const loggedInUser = {
							firstName: firstName,
							lastName: lastName,
							uid: data.user.uid,
							email: data.user.email,
						};
						localStorage.setItem("user", JSON.stringify(loggedInUser));
						console.log("user logged in successfully");
						dispatch({
							type: `${authConstanst.USER_LOGIN}_SUCCESS`,
							payload: { user: loggedInUser },
						});
					})
					.catch((e) => {
						console.log("errrir--<", e);
					});
			})
			.catch((e) => {
				console.log("erro=>", e);
				dispatch({
					type: `${authConstanst.USER_LOGIN}_FAILURE`,
					payload: { error: e },
				});
			});
	};
};

export const isLoggedInUser = () => {
	return (dispatch) => {
		const user = localStorage.getItem("user")
			? JSON.parse(localStorage.getItem("user"))
			: null;

		if (user) {
			dispatch({
				type: `${authConstanst.USER_LOGIN}_SUCCESS`,
				payload: { user: user },
			});
		} else {
			dispatch({
				type: `${authConstanst.USER_LOGIN}_FAILURE`,
				payload: { error: "Please login again" },
			});
		}
	};
};

export const logOut = (uid) => {
	return async (dispatch) => {
		dispatch({ type: `${authConstanst.USER_LOGOUT}_REQUEST` });
		const db = firebase.firestore();
		db.collection("users")
			.doc(uid)
			.update({
				isOnline: false,
			})
			.then(() => {
				auth()
					.signOut()
					.then(() => {
						localStorage.clear();
						dispatch({
							type: `${authConstanst.USER_LOGOUT}_SUCCESS`,
						});
					})
					.catch((e) => {
						console.log("erro-->", e);
						dispatch({
							type: `${authConstanst.USER_LOGOUT}_FAILURE`,
							payload: { error: e },
						});
					});
			})
			.catch((e) => {
				console.log("doc erro==>", e);
			});
	};
};
