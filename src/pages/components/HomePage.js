import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
	getRealTimeConversations,
	getRealTimeUsers,
	updateMessages,
} from "../../actions/userActions";
import Layout from "./Layout/Layout";
import firebase from "firebase";

const User = (prosp) => {};

export default function HomePage() {
	const authState = useSelector((state) => state.auth);
	const userState = useSelector((state) => state.user);
	const dispatch = useDispatch();
	const [chatUser, setChatUser] = useState("");
	const [chatStarted, setChatStarted] = useState(false);
	const [selectedUserUid, setSelectedUserUid] = useState("");
	const [message, setMessage] = useState("");
	const userSelectHandler = (name, uid) => {
		setChatStarted(true);
		setChatUser(name);
		setSelectedUserUid(uid);
		dispatch(getRealTimeConversations({ uid_1: authState.uid, uid_2: uid }));
	};
	let unsubscribe;

	const messageChangeHandler = (e) => {
		setMessage(e.target.value);
	};

	const onSendHandler = () => {
		let messageInfo = {
			user_uid_1: authState.uid,
			user_uid_2: selectedUserUid,
			message,
		};

		if (message !== "") {
			dispatch(updateMessages(messageInfo));
		}
	};

	useEffect(() => {
		unsubscribe = dispatch(getRealTimeUsers(authState.uid))
			.then((unsubscribe) => {
				return unsubscribe;
			})
			.catch((err) => {
				console.log("errr", err);
			});
	}, []);

	useEffect(() => {
		return () => {
			unsubscribe.then((f) => f()).catch((err) => console.log("errrrrrr", err));
		};
	}, []);
	return (
		<Layout>
			<section className="container">
				<div className="listOfUsers">
					{userState.users.length > 0
						? userState.users.map((user, index) => {
								return (
									<div
										onClick={() =>
											userSelectHandler(
												`${user.firstName} ${user.lastName}`,
												user.uid
											)
										}
										className="displayName"
										key={index}
									>
										<div className="displayPic">
											<img
												src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg"
												alt=""
											/>
										</div>
										<div
											style={{
												margin: "0 10px",
												display: "flex",
												flexGrow: 1,
												alignItems: "center",
												justifyContent: "space-between",
											}}
										>
											<span style={{ fontWeight: 500 }}>
												{user.firstName} {user.lastName}
											</span>
											<span>{user.isOnline ? "online" : "offline"}</span>
										</div>
									</div>
								);
						  })
						: ""}
				</div>
				<div className="chatArea">
					<div className="chatHeader">{chatStarted ? chatUser : ""}</div>
					{chatStarted ? (
						<>
							{" "}
							<div className="messageSections">
								{chatStarted
									? userState.conversations.map((con, index) => {
											return (
												<div
													key={index}
													style={{
														textAlign:
															con.user_uid_1 == authState.uid
																? "right"
																: "left",
													}}
												>
													<p className="messageStyle">{con.message}</p>
												</div>
											);
									  })
									: null}
							</div>
							<div className="chatControls">
								<textarea value={message} onChange={messageChangeHandler} />
								<button onClick={onSendHandler}>Send</button>
							</div>{" "}
						</>
					) : (
						""
					)}
				</div>
			</section>
		</Layout>
	);
}
