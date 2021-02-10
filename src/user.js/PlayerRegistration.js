import React, { useState, useEffect } from "react";
import {
	getByRollNo,
	createIndividaulReg,
} from "./userHelper/registrationHelper";
import { isAuthenticated } from "../auth/authhelper/index";
import { getBranchName, getYear, getGameName } from "./userHelper/format";

export default function PlayerRegistration({
	registration = undefined,
	setregistration = (f) => f,
}) {
	const { sport, disabled } = registration;

	const { user, token } = isAuthenticated();

	const [player, setplayer] = useState({
		playerData: "",
		success: "",
		error: "",
	});
	// useEffect(() => {
	// 	setplayer({
	// 		playerData: "",
	// 		success: "",
	// 		error: "",
	// 	});
	// 	setdbresponse({ dbSuccessResponse: "", dbErrorResponse: "" });
	// 	getPlayer();
	// }, [sport]);

	const { playerData, success, error } = player;

	const showPlayerDetails = () => {
		return (
			<div>
				<div className="container py-3  bg-dark">
					<h3 className="text-center text-white">Your details</h3>
					<div className="row my-3 mx-5 text-white">
						<div className="col-6 my-2 ">
							<div className="row ml-5  ">
								<h6 className="ml-5  mr-2">Name:</h6>
								{playerData.name}
							</div>
							<div className="row ml-5">
								<h6 className="ml-5  mr-2">Branch:</h6>
								{getBranchName(playerData.branch)}
							</div>
							<div className="row ml-5">
								<h6 className="ml-5 mr-2">Email Id:</h6>
								{playerData.email}
							</div>
						</div>
						<div className="col-6 my-2 ">
							<div className="row ml-5">
								<h6 className=" mr-2">Roll Number:</h6>
								{playerData.rollNo}
							</div>
							<div className="row ml-5">
								<h6 className=" mr-2">Year:</h6>{" "}
								{getYear(playerData.year)}
							</div>
							<div className="row ml-5">
								<h6 className=" mr-2">Mobile Number: </h6>
								{playerData.mobileNo}
							</div>
						</div>
					</div>
					<div className="row my-3 mx-5 text-white border">
						<div className="col-6 my-2 ">
							<div className="row mx-5">
								<h6 className="ml-5 my-1">Participating In:</h6>{" "}
								<h5 className="ml-4">{getGameName(sport)}</h5>
							</div>
						</div>
						<div className="col-6 my-2 ">
							<div className="row border mx-5">
								<button
									className="ml-auto mr-5"
									onClick={onSubmit}
								>
									Submit
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		);
	};
	const [dbresponse, setdbresponse] = useState({
		dbSuccessResponse: "",
		dbErrorResponse: "",
	});

	const { dbSuccessResponse, dbErrorResponse } = dbresponse;

	const dbResponseError = () => {
		return (
			dbErrorResponse && (
				<div className=" container text-white text-center border bg-dark">
					<div className="text-center">
						<h5>Registration Failed</h5>
						<p>{dbErrorResponse}</p>
					</div>
				</div>
			)
		);
	};

	const dbResponseSuccess = () => {
		return (
			dbSuccessResponse && (
				<div className=" container text-white text-center border bg-dark">
					<div className="text-center">
						<h5>Registration Done</h5>
						<p>
							(Please take screenshot to ensure your registration)
						</p>
					</div>
					<div className="row mb-3 ">
						<div className="col-5 mx-auto">
							<span className="d-block">
								<h6 className="d-inline mr-3">
									Registration No. :
								</h6>
								{dbSuccessResponse.regNo}
							</span>
							<span className="d-block">
								<h6 className="d-inline mr-3">Name:</h6>
								{dbSuccessResponse.userId}
							</span>
							<span className="d-block">
								<h6 className="d-inline mr-3">Roll Number:</h6>
								{dbSuccessResponse.rollNumber}{" "}
							</span>
							<span className="d-block">
								<h6 className="d-inline mr-3">Game:</h6>
								{getGameName(dbSuccessResponse.game)}
							</span>
						</div>
					</div>
					<button className="btn btn-success" onClick={done}>
						Done
					</button>
				</div>
			)
		);
	};
	const done = (event) => {
		event.preventDefault();
		setdbresponse({ dbSuccessResponse: "", dbErrorResponse: "" });
		setregistration({
			sport: "",
			disabled: "",
		});
		setplayer({
			playerData: "",
			success: "",
			error: "",
		});
	};
	const onSubmit = (event) => {
		event.preventDefault();
		setplayer({
			...player,
			error:"Please wait.....",
		});
		createIndividaulReg(user, sport, token).then((data) => {
			if (!data.fetchError) {
				if (data.error) {
					setdbresponse({
						dbSuccessResponse: false,
						dbErrorResponse: data.error,
					});
				} else {
					setdbresponse({
						dbSuccessResponse: data,
						dbErrorResponse: false,
					});
					setregistration({
						...registration,
						hide: true,
					});
				}
				setplayer({
					...player,
					error:"",
				});
			} else {
				setplayer({
					...player,
					success: false,
					error: data.fetchError,
				});
			}
		});
	};
	useEffect(() => {
		dbResponseError();
	}, [dbErrorResponse]);
	useEffect(() => {
		dbResponseSuccess();
	}, [dbSuccessResponse]);

	const getPlayer = () => {
		console.log(user);
		console.log(token);
		getByRollNo(user.rollNo, token, user._id).then((data) => {
			if (!data.fetchError) {
				if (data.error) {
					setplayer({
						...player,
						error: data.error,
					});
				} else {
					setplayer({
						playerData: data,
						success: true,
						error: false,
					});
				}
			} else {
				setplayer({
					...player,
					success: false,
					error: data.fetchError,
				});
			}
		});
	};
	// style={disabled ? {pointerEvents: "none", opacity: "0.4"} : {}
	useEffect(() => {
		getPlayer();
	}, []);

	const showError = () => {
		return <h4 className="text-center my-auto">{error}</h4>;
	};

	return (
		<div>
			<div className="alert alert-light mt-3">{error && showError()}</div>
			{!dbErrorResponse &&
				!dbSuccessResponse &&
				!error &&
				success &&
				showPlayerDetails()}
			{dbResponseError()}
			{dbResponseSuccess()}
		</div>
	);
}
