import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import { isAuthenticated, authenticate } from "../auth/authhelper/index";
import { Link } from "react-router-dom";
import {} from "./css/profile.css";
import {
	getYear,
	getBranchName,
	getGameName,
	isAdmin,
	isCoordinator,
} from "./userHelper/format";
import { updateProfile } from "./userHelper/profilehelper";

export default function Profile() {
	const { user, token } = isAuthenticated();

	const [profileUpdate, setProfileUpdate] = useState({
		disabled: true,
		dbresponse: "",
		dbsuccess: "",
		dberror: "",
		fetchError: "",
		message: "",
	});
	const {
		disabled,
		dbsuccess,
		dbresponse,
		message,
		fetchError,
		dberror,
	} = profileUpdate;
	//profile state for updateing the profile
	const [profile, setProfile] = useState({
		firstName: user.name.split(" ")[0],
		lastName: user.name.split(" ")[1],
		branch: user.branch,
		year: user.year,
		rollNumber: user.rollNo,
		email: user.email,
		mobileNo: user.mobileNo,
	});
	const {
		firstName,
		lastName,
		branch,
		year,
		rollNumber,
		email,
		mobileNo,
	} = profile;
	const [section, setSection] = useState({
		currentSection: "profile",
	});

	const { currentSection } = section;

	const profileSection = () => {
		return (
			<div className="profile">
				<div id="info" className="profile-section">
					<span id="name" className="profile_content">
						<p className="heading">Name:</p>
						{user.name}
						<span className="profile_badge">
							{isAdmin(user.role) && (
								<span className="badge admin">Admin</span>
							)}
							{!isAdmin(user.role) &&
								!isCoordinator(user.role) && (
									<span className="badge user">User</span>
								)}
							{isCoordinator(user.role) && (
								<span className="badge coordinator">
									Coordinator({" "}
									{getGameName(user.role.substring(1))} )
								</span>
							)}
						</span>
					</span>
				</div>
				<div id="acadmics" className="profile-section">
					<span id="rollNumber" className="profile_content">
						<p className="heading">Roll Number:</p>
						{user.rollNo}
					</span>
					<span id="branch" className="profile_content">
						<p className="heading">Branch:</p>
						{getBranchName(user.branch)}
					</span>
					<span id="year" className="profile_content">
						<p className="heading">Year:</p>
						{getYear(user.year)}
					</span>
				</div>
				<div id="contacts" className="profile-section">
					<span id="email" className="profile_content">
						<p className="heading">Email:</p>
						{user.email}
					</span>
					<span id="mobile" className="profile_content">
						<p className="heading">Mobile:</p>
						{user.mobileNo}
					</span>
				</div>
			</div>
		);
	};

	const handleChageProfile = (name) => (event) => {
		setProfile({ ...profile, [name]: event.target.value });
		setProfileUpdate({ disabled: false });
	};
	const updateSection = () => {
		return (
			<div className="update">
				<div id="info-update" className="profile-section">
					<span id="firstName" className="update_field">
						<label htmlFor="input" className="update_label">
							First Name
						</label>
						<input
							type="text"
							placeholder="First Name"
							value={firstName}
							onChange={handleChageProfile("firstName")}
							className="input"
						/>
					</span>
					<span id="firstName" className="update_field">
						<label htmlFor="" className="update_label">
							Last Name
						</label>
						<input
							type="text"
							placeholder="Last Name"
							value={lastName}
							onChange={handleChageProfile("lastName")}
							className="input"
						/>
					</span>
					{user.role == 1 && (
						<span className="badge admin">Admin</span>
					)}
					{user.role == 0 && <span className="badge user">User</span>}
					{user.role == 2 && (
						<span className="badge coordinator">Coordinator</span>
					)}
				</div>
				<div id="acadmics-update" className="profile-section">
					<span id="rollNumber" className="update_field">
						<label htmlFor="" className="update_label">
							Roll Number
						</label>
						<input
							type="text"
							placeholder="Roll Number"
							className="input-10"
							value={rollNumber}
							onChange={handleChageProfile("rollNumber")}
						/>
					</span>
					<span id="branch" className="update_field">
						<label htmlFor="" className="update_label">
							Branch
						</label>
						<select
							value={branch}
							onChange={handleChageProfile("branch")}
							className="select-input select-branch"
						>
							<option value="" selected disabled>
								Select branch:
							</option>
							<option className="option_height" value="CSE">
								Computer Science and Engineering
							</option>
							<option className="option_height" value="TT">
								Textile Technology
							</option>
							<option className="option_height" value="TC">
								Textile Chemistry
							</option>
						</select>
					</span>
					<span id="year" className="update_field">
						<label htmlFor="" className="update_label">
							Year
						</label>
						<select
							value={year}
							onChange={handleChageProfile("year")}
							className="select-input select-year"
						>
							<option
								className="option_height"
								value=""
								selected
								disabled
							>
								Select Year:
							</option>
							<option className="option_height" value="1Y">
								1st
							</option>
							<option className="option_height" value="2Y">
								2nd
							</option>
							<option className="option_height" value="3Y">
								3rd
							</option>
							<option className="option_height" value="4Y">
								4th
							</option>
						</select>
					</span>
				</div>
				<div id="contacts-update" className="profile-section">
					<span id="email" className="update_field">
						<label htmlFor="" className="update_label">
							Email
						</label>
						<input
							className="input"
							placeholder="Email"
							value={email}
							onChange={handleChageProfile("email")}
							type="email"
						/>
					</span>
					<span id="mobile" className="update_field">
						<label htmlFor="" className="update_label">
							Mobile Number
						</label>
						<input
							className="input-10"
							placeholder="Mobile Number"
							type="text"
							maxlength="10"
							value={mobileNo}
							onChange={handleChageProfile("mobileNo")}
						/>
					</span>
				</div>
			</div>
		);
	};
	const showProfile = () => {
		setSection({
			currentSection: "profile",
		});
	};
	const showUpdate = () => {
		setSection({
			currentSection: "update",
		});
	};
	const profileInfo = () => {
		return (
			<div id="profile">
				<div id="container-grid">
					<div id="buttons">
						<div
							id="profile-link"
							onClick={showProfile}
							className={
								currentSection == "profile"
									? "button-selected"
									: "button-section"
							}
						>
							<p className="link">Profile</p>
						</div>
						<div
							id="update-link"
							onClick={showUpdate}
							className={
								currentSection == "update"
									? "button-selected"
									: "button-section"
							}
						>
							<span className="link">Update</span>
						</div>
					</div>
					{currentSection == "profile" && profileSection()}
					{currentSection == "update" && updateSection()}
				</div>
				{currentSection == "update" && (
					<div className="profile-buttons">
						<button
							className="btn-profile"
							onClick={resetButton}
							id="reset"
							style={
								disabled
									? { opacity: "0.6", cursor: "not-allowed" }
									: {}
							}
						>
							Reset
						</button>
						<button
							className="btn-profile"
							id="update"
							onClick={updateButton}
							style={
								disabled
									? { opacity: "0.6", cursor: "not-allowed" }
									: {}
							}
						>
							Update
						</button>
					</div>
				)}
			</div>
		);
	};

	const updateButton = (event) => {
		event.preventDefault();
		updateProfile(user._id, token, profile).then((data) => {
			if (!data.fetchError) {
				if (data.error) {
					setProfileUpdate({
						...profileUpdate,
						fetchError: "",
						dberror: data.error,
						dbresponse: data.error,
						dbsuccess: false,
					});
				} else {
					setProfileUpdate({
						...profileUpdate,
						fetchError: "",
						dberror: "",
						dbresponse: data,
						dbsuccess: true,
					});

					authenticate(data, () => {
						setProfileUpdate({
							...profileUpdate,
							message: "Successfully Update.",
						});
					});
				}
			} else {
				setProfileUpdate({
					...profileUpdate,
					fetchError: data.fetchError,
				});
			}
		});
	};

	const resetButton = (event) => {
		event.preventDefault();
		setProfile({
			firstName: user.name.split(" ")[0],
			lastName: user.name.split(" ")[1],
			branch: user.branch,
			year: user.year,
			rollNumber: user.rollNo,
			email: user.email,
			mobileNo: user.mobileNo,
		});
		setProfileUpdate({
			disabled: true,
			dbresponse: "",
			dbsuccess: "",
			dberror: "",
		});
	};
	return (
		<Base title="Profile" description="Customize you Profile here">
			<div className="profile_section">{profileInfo()}</div>
		</Base>
	);
}
