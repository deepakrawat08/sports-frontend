import React, { useState, useEffect } from "react";
import "./helper/acoord.css";
import { getByRollNo } from "../user.js/userHelper/registrationHelper";
import { isAuthenticated } from "../auth/authhelper";
import { getRoles } from "@testing-library/react";
import {
	getRole,
	getBranchName,
	getYear,
	getGameName,
	isAdmin,
	isCoordinator,
} from "../user.js/userHelper/format";
import { updateUserRole, getAllCoordinators } from "./helper/getTeam";

export default function ACoordinator({
	adminTab = undefined,
	setadminTab = (f) => f,
}) {
	const [profile, setprofile] = useState({
		rollNo: "",
		profileData: "",
		coordOf: "",
		success: "",
		fetchError: "",
		error: "",
		isAllowed: true,
	});
	const [coorTab, setcoorTab] = useState({
		currentCoord: "rc",
		createCoord: "cc",
		removeCoord: "rc",
	});
	const [responseDb, setresponseDb] = useState({
		errorResponse: "",
		successResponse: "",
		fetchErrorResponse: "",
	});

	const {
		rollNo,
		profileData,
		success,
		fetchError,
		coordOf,
		error,
		isAllowed,
	} = profile;

	const { errorResponse, successResponse, fetchErrorResponse } = responseDb;
	const { currentCoord, createCoord, removeCoord } = coorTab;
	const { current, registration, coordinator } = adminTab;
	const { user, token } = isAuthenticated();

	const setAdminTab = (value) => {
		if (value != current && value === registration) {
			setadminTab({
				...adminTab,
				current: registration,
			});
		} else if (value != current && value === coordinator) {
			setadminTab({
				...adminTab,
				current: coordinator,
			});
		}
	};
	const setCoordTab = (value) => {
		if (currentCoord !== value && value === createCoord) {
			setcoorTab({
				...coorTab,
				currentCoord: createCoord,
			});
		} else if (currentCoord !== value && value === removeCoord) {
			setcoorTab({
				...coorTab,
				currentCoord: removeCoord,
			});
		}
		setprofile({
			rollNo: "",
			profileData: "",
			coordOf: "",
			success: "",
			fetchError: "",
			error: "",
			isAllowed: true,
		});
		setresponseDb({
			errorResponse: "",
			successResponse: "",
			fetchErrorResponse: "",
		});
		setcoordList({
			data: [],
			removeError: "",
			removeFetchError: "",
			isAllowedR: true,
		});
		setcoordUpdateDb({
			coordErrorDb: "",
			coordSuccessDb: "",
			coordFfetchErrorDb: "",
		});
	};

	const getProfileByRollNo = (event) => {
		event.preventDefault();
		getByRollNo(rollNo, token, user._id).then((data) => {
			if (!data.fetchError) {
				if (data.error) {
					setprofile({
						...profile,
						error: data.error,
						isAllowed: true,
					});
				} else {
					setprofile({
						...profile,
						profileData: data,
						isAllowed: true,
					});
				}
			} else {
				setprofile({
					...profile,
					fetchError: data.fetchError,
					isAllowed: true,
				});
			}
			setresponseDb({
				errorResponse: "",
				successResponse: "",
				fetchErrorResponse: "",
			});
		});
	};

	const profileHandler = (event) => {
		setprofile({
			...profile,
			rollNo: event.target.value,
			isAllowed: true,
			success: "",
			fetchError: "",
			error: "",
		});
		setresponseDb({
			errorResponse: "",
			successResponse: "",
			fetchErrorResponse: "",
		});
	};
	const getRole = (role) => {
		return (
			<React.Fragment>
				{isAdmin(role) && <span class="badge admin">Admin</span>}
				{!isAdmin(role) && !isCoordinator(role) && (
					<span class="badge user">User</span>
				)}
				{isCoordinator(role) && (
					<span class="badge coordinator">
						Coordinator( {getGameName(role.substring(1))} )
					</span>
				)}
			</React.Fragment>
		);
	};

	const isAllowedToBeCoord = (role) => {
		if (role === "u") {
			return true;
		} else {
			return false;
		}
	};

	const profileSection = () => {
		return (
			<div id="user_detail">
				<section class="cprofile">
					<div id="info" class="cprofile-section">
						<span id="cname" class="profile_span">
							<p class="cheading">Name:</p>
							{profileData.name}
						</span>
					</div>
					<div id="info" class="cprofile-section">
						<span id="cbadge ad" class="profile_span">
							<p class="cheading">Current Role:</p>
							{getRole(profileData.role)}
						</span>
					</div>

					<div id="acadmics" class="cprofile-section">
						<span id="crollNumber" class="profile_span">
							<p class="cheading">Roll Number:</p>
							{profileData.rollNo}
						</span>
						<span id="cbranch" class="profile_span">
							<p class="cheading">Branch:</p>
							{getBranchName(profileData.branch)}
						</span>
						<span id="cyear" class="profile_span">
							<p class="cheading">Year:</p>
							{getYear(profileData.year)}
						</span>
					</div>
					<div id="contacts" class="cprofile-section">
						<span id="cemail" class="profile_span">
							<p class="cheading">Email:</p>
							{profileData.email}
						</span>
						<span id="cmobile" class="profile_span">
							<p class="cheading">Mobile:</p>
							{profileData.mobileNo}
						</span>
					</div>
				</section>
			</div>
		);
	};

	const makeCoord = (event) => {
		event.preventDefault();
		if (isAllowedToBeCoord(profileData.role)) {
			if (coordOf !== "") {
				updateUserRole(user._id, token, rollNo, "c" + coordOf).then(
					(data) => {
						if (!data.fetchError) {
							if (data.error) {
								setresponseDb({
									...responseDb,
									errorResponse: data.error,
								});
							} else {
								console.log(data);
								setresponseDb({
									...responseDb,
									successResponse: data,
								});
							}
						} else {
							setresponseDb({
								...responseDb,
								fetchErrorResponse: data.fetchError,
							});
						}

						setprofile({
							...profile,
							rollNo: "",
							isAllowed: true,
							profileData: "",
							success: "",
							fetchError: "",
							error: "",
						});
					}
				);
			} else {
				alert(
					"Please Select Sport to which coordinator should belongs to."
				);
			}
		} else {
			setprofile({
				...profile,
				isAllowed: false,
				profileData: "",
				success: "",
				fetchError: "",
				error: "",
			});
		}
	};

	const notify = () => {
		return (
			!isAllowed && (
				<div
					className="notify"
					style={!isAllowed ? {} : { opacity: 0 }}
				>
					<span className="success">
						{rollNo} is already a Coordinator
					</span>
				</div>
			)
		);
	};

	const errorComp = () => {
		return (
			(error || fetchError) && (
				<div className="notify" style={isAllowed ? {} : { opacity: 0 }}>
					{error && <span className="error">{error}</span>}
					{fetchError && <span className="error">{fetchError}</span>}
				</div>
			)
		);
	};

	const coordChangeHandler = (event) => {
		setprofile({ ...profile, coordOf: event.target.value });
	};
	const selectCoord = () => {
		return (
			<div id="select_coordinator_div">
				<select
					class="select_coordinator"
					value={coordOf}
					onChange={coordChangeHandler}
				>
					<option value="" selected disabled>
						Select Sport
					</option>
					<option value="CR">Cricket</option>
					<option value="FB">Foot Ball</option>
					<option value="VB">Volley Ball</option>
					<option value="BD">Badminton</option>
					<option value="TT">Table Tennis</option>
					<option value="CH">Chess</option>
				</select>
			</div>
		);
	};
	const coordDbSuccess = () => {
		return (
			<section id="responseSuccess">
				<p id="successMessage">
					{successResponse.fullName}({successResponse.rollNo}) is now
					Coordinator of {getGameName(coordOf)}.
				</p>
			</section>
		);
	};
	const makeCoordButton = () => {
		return (
			<div id="makeAdmin_div">
				<button id="makeAdmin_btn" onClick={makeCoord}>
					Make Coordinator
				</button>
			</div>
		);
	};
	const coordstructure = () => {
		return (
			<div id="acoordinator">
				<div id="find_user">
					<div id="rollNo_div">
						<input
							class="crollno_input"
							type="text"
							maxLength="10"
							value={rollNo}
							onChange={profileHandler}
							placeholder="Roll Number"
						/>
					</div>
					<div id="findRoll_div">
						<button
							id="findRoll_btn"
							onClick={getProfileByRollNo}
							type="submit"
						>
							Find
						</button>
					</div>
				</div>
				{notify()}
				{errorComp()}
				{profileData &&
					isAllowed &&
					!errorResponse &&
					!successResponse &&
					profileSection()}
				{successResponse && coordDbSuccess()}

				{profileData &&
					isAllowed &&
					!errorResponse &&
					!successResponse &&
					selectCoord()}
				{profileData &&
					isAllowed &&
					!errorResponse &&
					!successResponse &&
					makeCoordButton()}
			</div>
		);
	};

	//coordinator nav
	const coordNav = () => {
		return (
			current === "coord" && (
				<div id="coor_tab">
					<button
						onClick={() => {
							setCoordTab(removeCoord);
						}}
						className={
							currentCoord === removeCoord
								? "coor_tab_focused_btn"
								: "coor_tab_btn"
						}
					>
						<span className="coor_section">All Coodinators</span>
					</button>
					<button
						onClick={() => {
							setCoordTab(createCoord);
						}}
						className={
							currentCoord === createCoord
								? "coor_tab_focused_btn"
								: "coor_tab_btn"
						}
					>
						<span className="coor_section">Create Coodinator</span>
					</button>
				</div>
			)
		);
	};

	//-------------------------Remove coordinator------------------------------

	const [coordList, setcoordList] = useState({
		data: [],
		removeError: "",
		removeFetchError: "",
		isAllowedR: true,
	});

	const [coordUpdateDb, setcoordUpdateDb] = useState({
		coordErrorDb: "",
		coordSuccessDb: "",
		coordFfetchErrorDb: "",
	});

	const { removeError, removeFetchError, isAllowedR } = coordList;
	const { coordErrorDb, coordFfetchErrorDb } = coordUpdateDb;

	const getAllCoord = () => {
		getAllCoordinators().then((data) => {
			console.log(data);
			if (!data.fetchError) {
				if (data.error) {
					setcoordList({
						...coordList,
						removeError: data.error,
						isAllowedR: true,
					});
				} else {
					setcoordList({
						...coordList,
						data: data,
						isAllowedR: true,
					});
				}
			} else {
				setcoordList({
					...coordList,
					removeFetchError: data.fetchError,
					isAllowedR: true,
				});
			}
		});
	};
	const removeCoordStruct = () => {
		return (
			<div class="remove_coordinator">
				<div class="heading_coord">
					<p class="coordHeading_col" id="coordHeading_name">
						Name
					</p>
					<p class="coordHeading_col" id="coordHeading_rollNo">
						Roll Number
					</p>
					<p class="coordHeading_col" id="coordHeading_year">
						Year
					</p>
					<p class="coordHeading_col" id="coordHeading_branch">
						Coordinator
					</p>
					<p class="coordHeading_col" id="coordHeading_year">
						Action
					</p>
				</div>
				{errorCompRemove()}
				{coordList["data"].map((coordinator) => {
					return (
						<div class="coordProfile" key={coordinator.rollNumber}>
							<p
								class="coordcaptain_col"
								id="coordcaptain_rollNo"
							>
								{coordinator.fullName}
							</p>
							<p
								class="coordcaptain_col"
								id="coordcaptain_rollNo"
							>
								{coordinator.rollNumber}
							</p>
							<p class="coordcaptain_col" id="coordcaptain_year">
								{coordinator.year}
							</p>
							<p
								class="coordcaptain_col"
								id="coordcaptain_branch"
							>
								{getGameName(coordinator.role.substring(1))}
							</p>
							<button
								class="removeCoord"
								onClick={() => {
									updateRoleToUser(coordinator.rollNumber);
								}}
							>
								Remove
							</button>
						</div>
					);
				})}
			</div>
		);
	};
	const updateRoleToUser = (rollNumber) => {
		if (window.confirm("Are you sure ?")) {
			updateUserRole(user._id, token, rollNumber, "u").then((data) => {
				if (!data.fetchError) {
					if (data.error) {
						setcoordUpdateDb({
							...coordUpdateDb,
							errorResponse: data.error,
						});
					} else {
						console.log(data);
						setcoordUpdateDb({
							...coordUpdateDb,
							successResponse: data,
						});
						getAllCoord();
					}
				} else {
					setcoordUpdateDb({
						...coordUpdateDb,
						fetchErrorResponse: data.fetchError,
					});
				}
			});
		}
	};
	const errorCompRemove = () => {
		return (
			(removeError || removeFetchError) && (
				<div
					className="notify"
					style={isAllowedR ? {} : { opacity: 0 }}
				>
					{removeError && (
						<span className="error">{removeError}</span>
					)}
					{removeFetchError && (
						<span className="error">{removeFetchError}</span>
					)}
				</div>
			)
		);
	};
	useEffect(() => {
		if (currentCoord === removeCoord) {
			getAllCoord();
		}
	}, [currentCoord]);
	return (
		<div>
			{coordNav()}
			{currentCoord === createCoord && coordstructure()}
			{currentCoord === removeCoord && removeCoordStruct()}
		</div>
	);
}
