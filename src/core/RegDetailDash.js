import React, { useState } from "react";
import Base from "./Base";
import "./helper/RegDash.css";
import "./helper/notify.css";
import { useEffect } from "react";
import {
	getAllTeam,
	getAllIndividual,
	getAllApprovedTeam,
	getAllApprovedIndividual,
} from "./helper/RegDashHelper";

import TeamRegShow from "./TeamRegShow";
import IndiRegShow from "./IndiRegShow";

export default function RegDash() {
	const [gameMode, setgameMode] = useState({
		team: "team",
		individual: "individual",
		notify: "Please Wait.....",
	});
	const [gameType, setgameType] = useState({
		gameRegType: "team",
	});
	const [dbResponse, setdbResponse] = useState({
		teamDbRespError: "",
		individualDbRespError: "",
	});

	const { teamDbRespeError, individualDbRespError } = dbResponse;
	const { team, individual, notify } = gameMode;

	const [individuals, setIndividual] = useState([]);

	const [teams, setteam] = useState([]);

	const { gameRegType } = gameType;

	const getAllTeamFormDb = () => {
		getAllApprovedTeam().then((data) => {
			console.log("---------------------------------");
			console.log(data);
			if (!data.fetchError) {
				console.log("---------------------------------");
				console.log(data);
				if (data.error) {
					dbResponse({
						teamDbRespeError: data.error,
					});
				} else {
					console.log(data);
					setteam(data);
					setgameMode({ ...gameMode, notify: "" });
				}
			} else {
				setgameMode({ ...gameMode, notify: data.fetchError });
			}
		});
	};

	const getAllIndividualFormDb = () => {
		getAllApprovedIndividual().then((data) => {
			if (!data.fetchError) {
				console.log("---------------------------------");
				console.log(data);

				if (data.error) {
					dbResponse({
						individualDbRespError: data.error,
					});
				} else {
					console.log(data);
					setIndividual(data);
					setgameMode({ ...gameMode, notify: "" });
				}
			} else {
				setgameMode({ ...gameMode, notify: data.fetchError });
			}
		});
	};

	useEffect(() => {
		getAllTeamFormDb();
		getAllIndividualFormDb();
	}, []);

	const changeGameType = (event) => {
		setgameType({ ...gameType, gameRegType: event.target.value });
		setgameMode({ ...gameMode, notify: "Please Wait...." });
		if (event.target.value == gameMode.team) {
			getAllTeamFormDb();
		} else {
			getAllIndividualFormDb();
		}
	};

	const teamRegShow = () => {
		return teams.length != 0 && <TeamRegShow teams={teams} />;
	};
	const indiRegShow = () => {
		return (
			individuals.length != 0 && <IndiRegShow individuals={individuals} />
		);
	};
	const regButton = (type) => {
		setgameType({ ...gameType, gameRegType: type });
		setgameMode({ ...gameMode, notify: "Please Wait...." });
		if (type == gameMode.team) {
			getAllTeamFormDb();
		} else {
			getAllIndividualFormDb();
		}
	};
	return (
		<Base
			title="Participants"
			description="Accepted registration for tournament 2020-2021"
		>
			<div id="custom_section">
				<div className="select_gameType">
					<span id="teamRegButton" className="gameType_span">
						<button
							className={
								gameRegType === team
									? "teamGame_btn_selected"
									: "teamGame_btn"
							}
							onClick={() => {
								regButton(team);
							}}
						>
							Team Game
						</button>
					</span>
				
					<span id="individualRegbutton" className="gameType_span">
						<button
							className={
								gameRegType === individual
									? "individualGame_btn_selected"
									: "individualGame_btn"
							}
							onClick={() => {
								regButton(individual);
							}}
						>
							Individual Game
						</button>
					</span>
				</div>

				{notify && (
					<div
						className="notify"
						style={notify ? {} : { opacity: 0 }}
					>
						<span className="success">{notify}</span>
					</div>
				)}
				{!notify && gameRegType == "team" && teamRegShow()}
				{!notify && gameRegType == "individual" && indiRegShow()}
			</div>
		</Base>
	);
}
