import React, { useState, useEffect } from "react";
import Base from "../core/Base";
import TeamRegistration from "./TeamRegistration";
import PlayerRegistration from "./PlayerRegistration";
import { getByRollNo } from "./userHelper/registrationHelper";
import { isAuthenticated } from "../auth/authhelper";
import { isPlayerAllowed } from "./userHelper/registrationUtils";
import "./css/registration.css";
import './css/notify.css'
export default function Registration() {
	const [registration, setregistration] = useState({
		sport: "",
		disabled: "",
		hide: "",
		enableRegistration: "",
		error: "",
	});

	const { sport, disabled, hide, error, enableRegistration } = registration;

	const handleChangeSport = (name) => (event) => {
		setregistration({
			...registration,
			[name]: event.target.value,
			disabled: true,
		});
	};

	const selectSport = () => {
		return (
			<div class="select_sport_section">
				<select
					class="select_sport"
					value={sport}
					onChange={handleChangeSport("sport")}
					style={
						disabled
							? { pointerEvents: "none", opacity: "0.6" }
							: {}
					}
				>
					<option
						class="select_sport_option"
						value=""
						selected
						disabled
					>
						Select Sport
					</option>
					<option class="select_sport_option" value="CR">
						Cricket
					</option>
					<option class="select_sport_option" value="FB">
						Foot Ball
					</option>
					<option class="select_sport_option" value="VB">
						Volley Ball
					</option>
					<option class="select_sport_option" value="BD">
						Badminton
					</option>
					<option class="select_sport_option" value="CH">
						Table Tennis
					</option>
					<option class="select_sport_option" value="CH">
						Chess
					</option>
				</select>
				<button
					class="reset_button"
					style={
						!sport ? { pointerEvents: "none", opacity: "0.6" } : {}
					}
					onClick={reset}
				>
					Reset
				</button>
			</div>
		);
	};
	const reset = () => {
		setregistration({
			sport: "",
			hide: "",
			disabled: "",
			enableRegistration: "",
			error: "Please wait.....",
		});
	};
	const getPlayerProfile = () => {
		getByRollNo(user.rollNo, token, user._id).then((data) => {
			if (!data.fetchError) {
				if (data.error) {
					setregistration({
						...registration,
						error: data.error,
					});
					console.log(data.error);
				} else {
					const isAllowed = isPlayerAllowed(data);
					if (isAllowed) {
						setregistration({
							...registration,
							error: false,
							enableRegistration: true,
						});
					} else {
						setregistration({
							...registration,
							error:
								"You have reached to the limit of participate in the event.",
						});
					}
				}
			} else {
				setregistration({
					...registration,
					error: data.fetchError,
				});
			}
		});
	};
	useEffect(() => {
		getPlayerProfile();
	}, [sport]);

	const { user, token } = isAuthenticated();

	useEffect(() => {
		setregistration({
			...registration,
			error: "Please wait.....",
		});
		getPlayerProfile();
	}, []);

	const teamForm = () => {
		return (
			<div className="container">
				<TeamRegistration
					registration={registration}
					setregistration={setregistration}
				/>
			</div>
		);
	};

	const individualGameReg = () => {
		return (
			<div className="container">
				<PlayerRegistration
					registration={registration}
					setregistration={setregistration}
				/>
			</div>
		);
	};

	const registrationContent = () => {
		return (
			<div>
				{!hide && selectSport()}
				{["CR", "FB", "VB"].includes(sport) && teamForm()}
				{["BD", "TT", "CH"].includes(sport) && individualGameReg()}
			</div>
		);
	};

	const showError = () => {
		return (
			<div class="notify">
				<span class="error">{error}</span>
			</div>
		);
	};

	return (
		<Base
			title="Regsitration"
			description="Make your regsitration to game you want to play"
		>
			{ showError()}
			{enableRegistration && registrationContent()}
		</Base>
	);
}
